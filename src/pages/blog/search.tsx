import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import debounce from 'lodash/debounce'
import { faSadCry } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Head from 'next/head'
import { PageLayout } from '../../layout/PageLayout'
import { PostPreview } from '../../components/PostPreview'
import type { ArticlePreview } from '../../types/article'
import { getArticlePreviews } from '../../util/articles'

dayjs.extend(advancedFormat)

interface PageProps {
  articles: ArticlePreview[]
  recent: ArticlePreview[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const previews = await getArticlePreviews()

  // sort previews by date
  const sorted = previews.sort((a, b) => {
    const aDate = dayjs(a.metadata.date)
    const bDate = dayjs(b.metadata.date)

    if (aDate.isBefore(bDate)) {
      return 1
    }

    if (aDate.isAfter(bDate)) {
      return -1
    }

    return 0
  })

  return {
    props: {
      articles: sorted,
      recent: sorted.slice(0, 5),
    },
  }
}

const Search: NextPage<PageProps> = ({ articles, recent }) => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<ArticlePreview[]>([])

  // function to debounce setSearch with lodash
  const debouncedSetSearch = debounce((query) => {
    setSearch(query)
    const results = articles.filter((article) => {
      const title = article.metadata.title.toLowerCase()
      const description = article.metadata.summary.toLowerCase()
      const queryLower = query.toLowerCase()
      return title.includes(queryLower) || description.includes(queryLower)
    })
    setSearchResults(results)
  }, 500)

  return (
    <PageLayout>
      <Head>
        <title>Search | Cameron Burrows</title>
      </Head>
      <div className="container mx-auto flex flex-col px-4 py-8 lg:px-0">
        <h1 className="mb-2 font-display text-4xl font-black">Search</h1>
        <input
          className="mt-4 w-full rounded-xl bg-accent px-6 py-2 text-lg focus:outline-none focus:ring focus:ring-primary-1"
          defaultValue={search}
          onChange={(e) => debouncedSetSearch(e.target.value)}
          placeholder="Search for posts"
        />
        {search ? (
          // show search results
          <ul className="flex flex-col gap-4 py-8">
            {searchResults.length ? (
              searchResults.map((result) => (
                <li key={result.slug}>
                  <PostPreview post={result} />
                </li>
              ))
            ) : search ? (
              <li className="flex flex-col items-center gap-4">
                <span>
                  No results found for <strong>{search}</strong>
                </span>
                <FontAwesomeIcon
                  icon={faSadCry}
                  size="3x"
                  className="ml-2 fill-current text-tertiary-2"
                />
              </li>
            ) : null}
          </ul>
        ) : (
          <div>
            <h2 className="mt-8 mb-4 font-display text-2xl font-black">
              Most Recent
            </h2>
            <ul className="flex flex-col gap-4">
              {recent.map((article) => (
                <li key={article.slug}>
                  <PostPreview post={article} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default Search
