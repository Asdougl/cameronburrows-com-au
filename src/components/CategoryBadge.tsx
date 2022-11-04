import {
  faBoxArchive,
  faCode,
  faPlaneDeparture,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Category } from '../types/metadata'

export const CategoryBadge = ({
  category,
  className,
}: {
  category: Category
  className?: string
}) => {
  let icon = faBoxArchive

  switch (category) {
    case 'travel':
      icon = faPlaneDeparture
      break
    case 'tech':
      icon = faCode
      break
    default:
      icon = faBoxArchive
      break
  }
  return (
    <div
      className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white ${
        category === 'travel'
          ? 'bg-green-500'
          : category === 'tech'
          ? 'bg-blue-500'
          : 'bg-gray-500'
      } ${className}`}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {category}
    </div>
  )
}
