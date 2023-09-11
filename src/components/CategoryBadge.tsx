import {
  ArchiveBoxIcon,
  CodeBracketIcon,
  GlobeEuropeAfricaIcon,
  InboxStackIcon,
} from '@heroicons/react/24/outline'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const badge = cva(
  [
    'rounded-full px-4 py-1 font-semibold uppercase tracking-widest border-2 flex items-center',
  ],
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
  let icon

  switch (props.category) {
    case 'travel':
      icon = <GlobeEuropeAfricaIcon height={14} className="mr-2" />
      break
    case 'tech':
      icon = <CodeBracketIcon height={14} className="mr-2" />
      break
    case 'all':
      icon = <InboxStackIcon height={14} className="mr-2" />
      break
    default:
      icon = <ArchiveBoxIcon height={14} className="mr-2" />
      break
  }
  return (
    <div className={badge({ ...props, className: props.className })}>
      {icon}
      {props.category}
    </div>
  )
}
