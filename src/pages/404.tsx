import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faFaceThinking } from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link'
import { PageLayout } from '../layout/PageLayout'
import { getArticlePreviews } from '../util/articles'
import type { ArticlePreview } from '../types/article'
import { PostPreview } from '../components/PostPreview'

interface PageProps {
  articles: ArticlePreview[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const previews = await getArticlePreviews()

  return {
    props: {
      articles: previews.slice(0, 5),
    },
  }
}

const Home: NextPage<PageProps> = ({ articles }) => {
  return (
    <PageLayout>
      <Head>
        <title>Cameron Burrows</title>
        <meta name="description" content="Cameron Burrows website and blog" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="container mx-auto max-w-2xl py-16">
        <div className="flex items-baseline gap-2 pt-4 pb-10 text-6xl opacity-50">
          <FontAwesomeIcon icon={faFaceThinking} />
          <h2 className="font-display text-6xl font-black">Hmmm...</h2>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="px-8 font-display text-xl">
            Not sure where you were trying to go...
          </h1>
          <div className="flex items-center justify-center">
            <Link href="/blog">
              <a className="group flex items-center">
                <div className="w-0">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="translate-x-1 scale-75 pr-3 opacity-0 transition-all group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                  />
                </div>
                <div className="z-10 transition-transform group-hover:translate-x-6">
                  <div className="rounded-2xl bg-accent px-6 py-2">
                    Head back home
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <h4 className="mb-6 px-8 font-display text-xl">
          Check out the latest blog posts
        </h4>
        <ul className="flex flex-col gap-4">
          {articles.map((article, index) => (
            <PostPreview
              key={article.slug}
              post={article}
              mostRecent={index === 0}
            />
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}

export default Home
