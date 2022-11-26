import dayjs from 'dayjs'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { CategoryPage } from '../../layout/CategoryPage'
import { PageLayout } from '../../layout/PageLayout'
import type { ArticlePreview } from '../../types/article'
import { getArticlePreviews } from '../../util/articles'

interface PageProps {
  articles: ArticlePreview[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const articles = await getArticlePreviews()

  // sort previews by date
  const sorted = articles.sort((a, b) => {
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
      articles: sorted.slice(0, 5),
    },
  }
}

const Blog: NextPage<PageProps> = ({ articles }) => {
  return (
    <PageLayout>
      <Head>
        <title>Blog | Cameron Burrows</title>
        <meta name="description" content="Cameron Burrows website and blog" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <CategoryPage articles={articles} />
    </PageLayout>
  )
}

export default Blog
