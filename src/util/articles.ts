import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from '../types/metadata'
import type { Category } from '../types/metadata'

import type { Article, ArticlePreview } from '../types/article'

interface GetArticleParams {
  category?: Category
  page?: number
}

interface ArticleFile {
  category: Category
  filename: string
  slug: string
}

// function to read all misc files and return the contents
export const getArticleFiles = async (
  category: Category
): Promise<ArticleFile[]> => {
  const miscfiles = await fs.readdir(
    path.resolve(process.cwd(), 'content', category)
  )
  return miscfiles.map((file) => ({
    category: category,
    slug: path.parse(file).name,
    filename: file,
  }))
}

// async function to read a file and return the contents
export const readArticle = async (
  file: ArticleFile
): Promise<Article | null> => {
  try {
    const contents = await fs.readFile(
      path.resolve(process.cwd(), 'content', file.category, file.filename)
    )

    const { data, content } = matter(contents.toString())

    const metadata = Metadata.parse(data)

    return {
      metadata,
      slug: file.slug,
      content,
      category: file.category,
    }
  } catch (error) {
    return null
  }
}

const PAGE_SIZE = 10 // number of results per page

// function to get all articles based on category and page
export const getArticles = async (params?: GetArticleParams) => {
  const { category, page = 0 } = params || {}

  let articleFiles: ArticleFile[] = []
  if (!category) {
    // get all articles
    const [tech, travel, misc] = await Promise.all([
      fs.readdir(path.resolve(process.cwd(), 'content/tech')),
      fs.readdir(path.resolve(process.cwd(), 'content/travel')),
      fs.readdir(path.resolve(process.cwd(), 'content/misc')),
    ])
    articleFiles = [
      ...tech.map<ArticleFile>((filename) => ({
        category: 'tech',
        filename,
        slug: path.parse(filename).name,
      })),
      ...travel.map<ArticleFile>((filename) => ({
        category: 'travel',
        filename,
        slug: path.parse(filename).name,
      })),
      ...misc.map<ArticleFile>((filename) => ({
        category: 'misc',
        filename,
        slug: path.parse(filename).name,
      })),
    ]
  } else {
    // get articles for a specific category
    const filenames = await fs.readdir(
      path.resolve(process.cwd(), 'content', category)
    )
    articleFiles = filenames.map<ArticleFile>((filename) => ({
      category,
      filename,
      slug: path.parse(filename).name,
    }))
  }

  // filter out non-markdown files
  articleFiles = articleFiles.filter(
    (file) => path.extname(file.filename) === '.md'
  )

  // read all articles in articleFiles
  const articles = await Promise.all(articleFiles.map(readArticle))

  // filter out articles that failed to parse
  const parsedArticles = articles.filter(
    (article) => article !== null
  ) as Article[]

  // sort articles by date
  parsedArticles.sort((a, b) => {
    if (a.metadata.date > b.metadata.date) {
      return -1
    } else if (a.metadata.date < b.metadata.date) {
      return 1
    } else {
      return 0
    }
  })

  // paginate articles
  const paginatedArticles = parsedArticles.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  )

  // return all articles
  return {
    total: parsedArticles.length,
    articles: paginatedArticles,
  }
}

// remove content from articles
export const getArticlePreviews = async (
  params?: GetArticleParams
): Promise<ArticlePreview[]> => {
  const { articles } = await getArticles(params)
  return articles.map((article) => ({
    metadata: article.metadata,
    slug: article.slug,
    category: article.category,
  }))
}
