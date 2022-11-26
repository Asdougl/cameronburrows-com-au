import {
  faBooks,
  faBoxArchive,
  faCode,
  faPlaneDeparture,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const badge = cva(
  ['rounded-full px-4 py-1 font-semibold uppercase tracking-widest border-2'],
  {
    variants: {
      category: {
        travel: 'bg-travel text-black border-travel',
        tech: 'bg-tech text-black border-tech',
        misc: 'bg-misc text-black border-misc',
        all: 'bg-transparent text-white border-misc',
      },
      size: {
        regular: 'text-sm',
        large: 'text-base text-center',
      },
    },
    defaultVariants: {
      size: 'regular',
    },
  }
)

type CategoryBadgeProps = VariantProps<typeof badge> & { className?: string }

export const CategoryBadge = (props: CategoryBadgeProps) => {
  let icon = faBoxArchive

  switch (props.category) {
    case 'travel':
      icon = faPlaneDeparture
      break
    case 'tech':
      icon = faCode
      break
    case 'all':
      icon = faBooks
      break
    default:
      icon = faBoxArchive
      break
  }
  return (
    <div className={badge({ ...props, className: props.className })}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {props.category}
    </div>
  )
}
