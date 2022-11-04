import dayjs from 'dayjs'
import advancedFormats from 'dayjs/plugin/advancedFormat'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/pro-regular-svg-icons'
import type { Article } from '../types/article'
import { timeSince } from '../util/helpers'
import { Markdown } from './Markdown'

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
      <div className="container mx-auto flex flex-col gap-4 px-4 pb-8 pt-4 lg:px-0 lg:pt-10 lg:pb-16">
        {outdated && (
          <div className="flex pb-8">
            <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-warning-1 to-accent p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning-2">
                <FontAwesomeIcon icon={faWarning} size="lg" />
              </div>
              <div className="flex flex-col pr-8">
                <span className="font-medium">
                  This article may be outdated
                </span>
                <span className="text-sm">
                  Check the relative package versions provided
                </span>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-3xl font-black lg:text-6xl">
          {article.metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-tertiary-2">
          <div>{published.format('Do MMMM, YYYY')}</div>
          <div className="h-1 w-1 rounded-full bg-tertiary-2"></div>
          <div>{timeSince(published.toDate())}</div>
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
