import type { Category, Metadata } from './metadata'

export interface PotentialArticle {
  content: string
  metadata: Metadata | null
  slug: string
  category: Category
}

export interface Article extends PotentialArticle {
  metadata: Metadata
}

export const isArticle = (article: PotentialArticle): article is Article => {
  return article.metadata !== null
}

export type ArticlePreview = Pick<Article, 'slug' | 'metadata' | 'category'>
