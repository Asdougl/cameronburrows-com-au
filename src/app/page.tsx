import type { Metadata } from 'next'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import shuffle from 'lodash/shuffle'
import { getArticlePreviews } from '../util/articles'
import { PostPreview } from '../components/PostPreview'
import { AIRPORTS } from '../util/constants'
import { Hero } from '../components/Hero'

export const metadata: Metadata = {
  title: 'Cameron Burrows',
  description: 'Cameron Burrows is a software engineer based in Australia.',
}

export default async function Page() {
  const articles = await getArticlePreviews()

  const airports = shuffle(AIRPORTS)

  return (
    <main>
      <Hero airports={airports} />
      <section className="container mx-auto px-4 pt-12 lg:px-0">
        <h2 className="px-6 pb-12 font-display text-2xl text-tertiary-2 flex items-center gap-2">
          <NewspaperIcon height={24} /> Latest Posts
        </h2>
        <div className="flex grid-cols-3 flex-col gap-4 pb-12 lg:grid">
          {articles.map((article, index) => (
            <PostPreview
              key={article.slug}
              post={article}
              mostRecent={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
