import dayjs from 'dayjs'
import advancedFormats from 'dayjs/plugin/advancedFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faWarning } from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link'
import type { Article } from '../types/article'
import { timeSince } from '../util/helpers'
import { Markdown } from './Markdown'
import { CategoryBadge } from './CategoryBadge'

dayjs.extend(advancedFormats)

interface PostProps {
  article: Article
}

export const Post = ({ article }: PostProps) => {
  const published = dayjs(article.metadata.date)

  const outdated =
    article.category === 'tech' && dayjs().diff(published, 'months') >= 6

  return (
    <div className="py-4">
      <div className="mx-auto flex max-w-prose flex-col gap-4 px-4 pb-8 pt-4 lg:container lg:px-0 lg:pt-10 lg:pb-16">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Link href={`/blog/${article.category}`}>
            <a className="group flex items-center">
              <div className="w-0">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="translate-x-1 pr-3 transition-transform group-hover:translate-x-0"
                />
              </div>
              <div className="z-10 transition-transform group-hover:translate-x-6">
                <CategoryBadge category={article.category} />
              </div>
            </a>
          </Link>
        </div>
        <h1 className="text-3xl font-black lg:text-6xl">
          {article.metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-tertiary-2">
          <div>{published.format('Do MMMM, YYYY')}</div>
          <div className="h-1 w-1 rounded-full bg-tertiary-2"></div>
          <div>{timeSince(published.toDate())}</div>
          {outdated && (
            <div className="rounded-full bg-warning-2 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-background">
              <FontAwesomeIcon icon={faWarning} className="mr-2" />
              This article may be outdated
            </div>
          )}
        </div>
        {article.metadata.packages && (
          <div className="flex gap-2 font-mono text-tertiary-2">
            {article.metadata.packages.map((npmPkg) => (
              <span key={npmPkg} className="rounded-xl bg-accent px-3">
                {npmPkg}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="bg-accent px-4 pb-8 pt-8 lg:px-0 lg:pt-16">
        <Markdown>{article.content}</Markdown>
      </div>
    </div>
  )
}
