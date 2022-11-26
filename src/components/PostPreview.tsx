import { faStar } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Link from 'next/link'
import type { ArticlePreview } from '../types/article'
import { timeSince } from '../util/helpers'
import { CategoryBadge } from './CategoryBadge'

dayjs.extend(advancedFormat)

interface PostPreviewProps {
  post: ArticlePreview
  mostRecent?: boolean
}

// post preview component
export const PostPreview = ({ post, mostRecent }: PostPreviewProps) => {
  const published = dayjs(post.metadata.date)

  return (
    <Link href={`/blog/post/${post.slug}`}>
      <a className="group relative flex w-full flex-col items-start rounded-xl bg-accent px-6 py-4 hover:bg-accent/80">
        <CategoryBadge category={post.category} />
        <div className="pt-2 pb-2 font-display text-3xl font-black group-hover:underline">
          {post.metadata.title}
        </div>
        <div className="flex text-tertiary-2">
          {published.format('Do MMMM, YYYY')} &bull;{' '}
          {timeSince(published.toDate())}
        </div>
        {mostRecent && (
          <div className="absolute -top-3 right-4 rounded-full bg-warning-2 px-2 py-1 text-sm font-semibold uppercase tracking-widest text-background shadow-lg">
            <FontAwesomeIcon icon={faStar} /> Latest
          </div>
        )}
      </a>
    </Link>
  )
}
