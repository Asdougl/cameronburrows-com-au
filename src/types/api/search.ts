import type { ArticlePreview } from '../article'

export type ApiSearchSuccess = ArticlePreview[]

export type ApiSearchError = { error: string }

export type ApiSearchResult = ApiSearchSuccess | ApiSearchError
