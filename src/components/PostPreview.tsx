import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Link from 'next/link'
import type { ArticlePreview } from '../types/article'
import { timeSince } from '../util/helpers'
import { CategoryBadge } from './CategoryBadge'

dayjs.extend(advancedFormat)

// post preview component
export const PostPreview = ({ post }: { post: ArticlePreview }) => {
  const published = dayjs(post.metadata.date)

  return (
    <Link href={`/${post.category}/${post.slug}`}>
      <a className="group flex w-full flex-col items-start rounded-xl bg-accent px-6 py-4">
        <CategoryBadge category={post.category} />
        <div className="pt-2 pb-2 font-display text-3xl font-black group-hover:underline">
          {post.metadata.title}
        </div>
        <div className="flex text-tertiary-2">
          {published.format('Do MMMM, YYYY')} &bull;{' '}
          {timeSince(published.toDate())}
        </div>
      </a>
    </Link>
  )
}
