import type { NextApiHandler } from 'next'
import { z } from 'zod'
import isError from 'lodash/isError'
import { Category } from '../../types/metadata'
import type { ApiSearchResult } from '../../types/api/search'
import { getArticlePreviews } from '../../util/articles'

const SearchQuery = z.object({
  term: z.string(),
  page: z.number().optional(),
  category: Category.optional(),
})

const search: NextApiHandler<ApiSearchResult> = async (req, res) => {
  try {
    const query = SearchQuery.parse(req.query) // parse the query string

    const articles = await getArticlePreviews({
      category: query.category,
      page: query.page,
    })

    const searchResults = articles.filter(
      (article) =>
        article.metadata.title
          .toLowerCase()
          .includes(query.term.toLowerCase()) ||
        article.metadata.summary
          .toLowerCase()
          .includes(query.term.toLowerCase()) ||
        article.metadata.tags.some((tag) =>
          tag.toLowerCase().includes(query.term.toLowerCase())
        )
    )

    res.status(200).json(searchResults) // return the search results
  } catch (error) {
    const errMsg = isError(error) ? error.message : 'Unknown error' // zod errors are not instances of Error
    res.status(500).json({ error: errMsg }) // return the error
  }
}

export default search
