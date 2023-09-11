'use client'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import type { ArticlePreview } from '../types/article'
import { timeSince } from '../util/helpers'
import { twsx } from '../util/tw'
import { CategoryBadge } from './CategoryBadge'

dayjs.extend(advancedFormat)

interface PostPreviewProps {
  post: ArticlePreview
  mostRecent?: boolean
}

const ringColor = (category: string) => {
  switch (category) {
    case 'travel':
      return 'ring-travel'
    case 'tech':
      return 'ring-tech'
    default:
      return 'ring-misc'
  }
}

// post preview component
export const PostPreview = ({ post, mostRecent }: PostPreviewProps) => {
  const published = dayjs(post.metadata.date)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (linkRef.current && cardRef.current) {
      const { x, y, width, height } = linkRef.current.getBoundingClientRect()

      const xPercent = (e.clientX - x) / width
      const yPercent = (e.clientY - y) / height

      const xDeg = (xPercent - 0.5) * 20
      const yDeg = (yPercent - 0.5) * 20

      cardRef.current.style.transform = `perspective(1000px) rotateX(${-yDeg}deg) rotateY(${xDeg}deg)`
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (
    <Link
      ref={linkRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={`/blog/post/${post.slug}`}
      className="group hover:scale-105 transition-transform focus:scale-105 focus:outline-none hover:z-10"
    >
      <div
        ref={cardRef}
        className={twsx(
          'relative flex w-full h-full flex-col items-start rounded-xl bg-accent px-6 py-4 group-hover:bg-accent/80 transition-transform duration-75 ease-linear group-hover:ring group-focus:ring',
          ringColor(post.category)
        )}
      >
        <CategoryBadge category={post.category} />
        <div className="pt-2 pb-2 font-display text-3xl font-black group-hover:underline flex-grow">
          {post.metadata.title}
        </div>
        <div className="flex text-tertiary-2">
          {published.format('Do MMMM, YYYY')} &bull;{' '}
          {timeSince(published.toDate())}
        </div>
        {mostRecent && (
          <div className="absolute -top-3 right-4 rounded-full bg-warning-2 px-2 py-1 text-sm font-semibold uppercase tracking-widest text-background shadow-lg flex gap-1 items-center">
            <StarIcon height={16} /> Latest
          </div>
        )}
      </div>
    </Link>
  )
}
