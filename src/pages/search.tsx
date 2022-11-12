import type { NextPage } from 'next'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import debounce from 'lodash/debounce'
import { faSadCry, faSpinner } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Head from 'next/head'
import { PageLayout } from '../layout/PageLayout'
import type { ApiSearchResult } from '../types/api/search'
import { errorToString, hasProperty } from '../util/helpers'
import { PostPreview } from '../components/PostPreview'

dayjs.extend(advancedFormat)

const Search: NextPage = () => {
  const [search, setSearch] = useState('')

  // function to debounce setSearch with lodash
  const debouncedSetSearch = debounce(setSearch, 500)

  const { data, isLoading } = useQuery<ApiSearchResult>(
    ['search', search],
    async () => {
      if (search) {
        const response = await fetch(`/api/search?term=${search}`)
        return response.json()
      } else {
        return []
      }
    }
  )

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
        {isLoading ? (
          // show loading indicator
          <p className="flex items-center justify-center py-8">
            <FontAwesomeIcon icon={faSpinner} spin /> Loading...
          </p>
        ) : data ? (
          hasProperty(data, 'error') ? (
            // show error message
            <p>{errorToString(data.error)}</p>
          ) : (
            // show search results
            <ul className="flex flex-col gap-4 py-8">
              {data.length ? (
                data.map((result) => (
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
          )
        ) : (
          <p>No data</p>
        )}
      </div>
    </PageLayout>
  )
}

export default Search
