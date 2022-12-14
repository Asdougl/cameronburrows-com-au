import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/pro-regular-svg-icons'
import { PageLayout } from '../layout/PageLayout'
import { BoardingPass } from '../components/BoardingPass'
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
      articles: previews,
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

      <section className="relative z-10 flex flex-col items-center justify-center gap-4 bg-accent px-4 pt-16 pb-24 lg:px-0 lg:pt-36">
        <div className="-z-10 -mb-32 flex w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1502 1502"
            className="h-64 text-tertiary-3 opacity-50 lg:h-96"
          >
            <path
              fill="currentColor"
              d="M760.764,990.111c-72.051,68.7-144.495,99.369-191.058,72.489a0.147,0.147,0,0,0-.013-0.01h0C458.155,998.2,394.149,883.128,389.9,763.255,125.237,576.636-36.007,397.724,7.522,322.33c42.369-73.385,266.671-27.8,549.662,100l-20.659,13.741-19.16,13.187-22.2,19.686c-171.625-70.51-298.587-94.058-323.093-51.612-38.384,66.482,189.118,269.69,508.139,453.877s608.754,279.6,647.134,213.123c24.5-42.43-59.29-140.544-206.06-253.863l3.73-17.685,4.24-33.347,1.95-25.6c251.72,180.984,403.02,352.181,360.69,425.491C1440.78,1267.85,1124.98,1183.27,760.764,990.111ZM690.091,854.086c-105.553-60.94-203.532-124.045-290.786-186.3a360.014,360.014,0,0,1,38.618-96.963C537.315,398.671,757.424,339.667,929.6,439c0.036,0.021.074,0.038,0.111,0.059,74.614,43.079,54.511,217.584-44.9,389.77a798.292,798.292,0,0,1-65.428,96.647Q755.513,891.811,690.091,854.086Z"
            />
          </svg>
        </div>
        <h2 className="font-display text-6xl">
          <span className="font-bold">I am</span>{' '}
          <span className="font-black text-primary-1">Cameron Burrows</span>
        </h2>
        <h3 className="text-3xl text-tertiary-2">
          Developer <span className="text-tertiary-3">&amp;</span> Traveller
        </h3>
        <div className="relative z-10 pt-16">
          <BoardingPass />
        </div>
      </section>
      <section className="container mx-auto px-4 pt-12 lg:px-0">
        <h2 className="px-6 pb-12 font-display text-2xl text-tertiary-2">
          <FontAwesomeIcon icon={faNewspaper} size="sm" className="pr-2" />{' '}
          Latest Posts
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
    </PageLayout>
  )
}

export default Home
