import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const twsx = (...inputs: clsx.ClassValue[]) => {
  return twMerge(clsx(inputs))
}
