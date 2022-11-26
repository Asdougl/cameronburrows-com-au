import {
  faBoxArchive,
  faCode,
  faPlaneDeparture,
} from '@fortawesome/pro-regular-svg-icons'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import upperFirst from 'lodash/upperFirst'
import { CategoryPage } from '../../layout/CategoryPage'
import { PageLayout } from '../../layout/PageLayout'
import type { ArticlePreview } from '../../types/article'
import { Category } from '../../types/metadata'
import { getArticlePreviews } from '../../util/articles'

type PageParams = {
  category: string
}

type PageProps = {
  category: Category
  articles: ArticlePreview[]
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  return {
    paths: Category.options.map((category) => ({
      params: { category },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  const paramParse = Category.safeParse(params?.category)

  if (!paramParse.success) return { notFound: true }

  const previews = await getArticlePreviews({ category: paramParse.data })

  return {
    props: {
      articles: previews,
      category: paramParse.data,
    },
  }
}

export const TechPage: NextPage<PageProps> = ({ articles = [], category }) => {
  const icon =
    category === 'tech'
      ? faCode
      : category === 'travel'
      ? faPlaneDeparture
      : category === 'misc'
      ? faBoxArchive
      : undefined

  return (
    <PageLayout>
      <Head>
        <title>{`${upperFirst(category)} | Cameron Burrows`}</title>
        <meta name="description" content="Cameron Burrows website and blog" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <CategoryPage icon={icon} category={category} articles={articles} />
    </PageLayout>
  )
}

export default TechPage
