import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import compact from 'lodash/compact'
import { Metadata, Category } from '../types/metadata'
import type { Article, ArticlePreview } from '../types/article'

interface GetArticleParams {
  category?: Category
  page?: number
}

interface ArticleFile {
  filename: string
  slug: string
  folder: Category | null
}

const isMarkdown = (filename: string): boolean =>
  path.extname(filename) === '.md'

// function to read all misc files and return the contents
export const getArticleFiles = async (
  category?: Category
): Promise<ArticleFile[]> => {
  const files = await fs.readdir(path.join(process.cwd(), 'content'), {
    withFileTypes: true,
  })

  const allFilenames = await Promise.all(
    files.map<Promise<ArticleFile[]>>(async (file) => {
      if (file.isFile() && isMarkdown(file.name)) {
        return [
          {
            filename: file.name,
            slug: path.parse(file.name).name,
            folder: null,
          },
        ]
      } else if (file.isDirectory()) {
        const categoryParse = Category.safeParse(file.name)
        if (
          categoryParse.success &&
          (!category || categoryParse.data === category)
        ) {
          return (
            await fs.readdir(
              path.join(process.cwd(), 'content', categoryParse.data)
            )
          )
            .filter(isMarkdown)
            .map((filename) => ({
              filename: `${categoryParse.data}/${filename}`,
              slug: path.parse(filename).name,
              folder: categoryParse.data,
            }))
        }
      }
      return []
    })
  )

  return allFilenames.flat()
}

// async function to read a file and return the contents
export const readArticle = async (
  file: ArticleFile
): Promise<Article | null> => {
  try {
    const contents = await fs.readFile(
      path.resolve(process.cwd(), 'content', file.filename)
    )

    const { data, content } = matter(contents.toString())

    const metadata = Metadata.parse(data)

    return {
      metadata,
      slug: file.slug,
      content,
      category: file.folder || 'misc',
    }
  } catch (error) {
    return null
  }
}

export const articleSort = (a: Article, b: Article) => {
  if (a.metadata.date > b.metadata.date) {
    return -1
  } else if (a.metadata.date < b.metadata.date) {
    return 1
  } else {
    return 0
  }
}

const PAGE_SIZE = 10 // number of results per page

// function to get all articles based on category and page
export const getArticles = async (params?: GetArticleParams) => {
  const { category, page = 0 } = params || {}

  try {
    // get all articles
    const articleFiles = await getArticleFiles(category)

    // read all articles in articleFiles
    const articles = await Promise.all(articleFiles.map(readArticle))

    // filter out articles that failed to parse
    const parsedArticles = compact(articles)

    // sort articles by date
    parsedArticles.sort(articleSort)

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
  } catch (error) {
    console.error(error)
    return {
      total: 0,
      articles: [],
    }
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
