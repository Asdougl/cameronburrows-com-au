import type { Category } from '../types/metadata'

export const textColor = (category: Category) => {
  switch (category) {
    case 'tech':
      return 'text-tech'
    case 'travel':
      return 'text-travel'
    default:
      return 'text-misc'
  }
}
