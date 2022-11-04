import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { PostPreview } from '../../components/PostPreview'
import { PageLayout } from '../../layout/PageLayout'
import type { ArticlePreview } from '../../types/article'
import { getArticlePreviews } from '../../util/articles'

interface PageProps {
  articles: ArticlePreview[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const previews = await getArticlePreviews({ category: 'tech' })

  return {
    props: {
      articles: previews,
    },
  }
}

export const TechPage: NextPage<PageProps> = ({ articles }) => {
  return (
    <PageLayout>
      <Head>
        <title>Tech</title>
      </Head>
      <div className="container mx-auto flex flex-col px-4 py-8 lg:px-0">
        <h1 className="mb-8 font-display text-4xl font-black">Tech</h1>
        <ul className="flex flex-col gap-4">
          {articles.map((article) => (
            <li key={article.slug}>
              <PostPreview post={article} />
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}

export default TechPage
