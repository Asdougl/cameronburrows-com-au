import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FC } from 'react'
import upperFirst from 'lodash/upperFirst'
import Link from 'next/link'
import { PostPreview } from '../components/PostPreview'
import type { ArticlePreview } from '../types/article'
import { Category } from '../types/metadata'
import { textColor } from '../util/colors'
import { CategoryBadge } from '../components/CategoryBadge'

interface CategoryPageProps {
  category?: Category
  icon?: IconDefinition
  articles: ArticlePreview[]
}

export const CategoryPage: FC<CategoryPageProps> = ({
  category,
  icon,
  articles,
}) => {
  const categoryLinks: (Category | 'all')[] = category
    ? ['all', ...Category.options.filter((c) => c !== category)]
    : Category.options

  return (
    <div className="container mx-auto flex flex-col px-4 pb-8 lg:px-0">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-8 lg:px-0">
        <div className="mb-4 flex items-center justify-center gap-4 text-5xl">
          {category ? (
            <>
              {icon && (
                <FontAwesomeIcon
                  icon={icon}
                  size="sm"
                  className={`mr-2 ${textColor(category)}`}
                />
              )}
              <h1 className="font-display font-black lg:text-6xl">
                {upperFirst(category)}
              </h1>
            </>
          ) : (
            <h1 className="font-display font-black lg:text-6xl">My Blog</h1>
          )}
        </div>
        <p className="mb-8 text-center text-gray-500">
          I write about web development, tech, travel, and other things.
        </p>
        <ul className="flex flex-col justify-between gap-4 py-4 lg:flex-row">
          {categoryLinks.map((c) => (
            <li className="flex-1" key={c}>
              <Link href={c !== 'all' ? `/blog/${c}` : '/blog'}>
                <a className="hover:opacity-80">
                  <CategoryBadge category={c} size="large" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-1 gap-4 pt-4">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <PostPreview post={article} mostRecent={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
