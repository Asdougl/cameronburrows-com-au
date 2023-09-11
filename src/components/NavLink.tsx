'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { twsx } from '../util/tw'

interface NavLinkProps {
  href: string
  label: string
}

export const MotionNavLink = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NavLinkProps>
>(function NavLinkComponent({ href, children, label }, ref) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link href={href} ref={ref}>
      <motion.div
        initial="hidden"
        whileHover="show"
        className={twsx(
          'group relative flex w-full items-center justify-start gap-2 rounded-xl py-4 px-4 font-display transition-colors hover:bg-accent hover:text-tertiary-2 lg:w-32 lg:justify-center lg:py-2',
          isActive ? 'text-tertiary-1' : 'text-tertiary-2'
        )}
      >
        {children}
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              width: '0px',
            },
            show: {
              opacity: 1,
              width: 'auto',
            },
          }}
        >
          {label}
        </motion.div>
      </motion.div>
    </Link>
  )
})

export const NavLink = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NavLinkProps>
>(function NavLinkComponent({ href, children, label }, ref) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link href={href} ref={ref}>
      <div
        className={twsx(
          'group relative flex w-full items-center justify-start gap-2 rounded-xl py-4 px-4 font-display transition-colors hover:bg-accent hover:text-tertiary-2 lg:w-32 lg:justify-center lg:py-2',
          isActive ? 'text-tertiary-1' : 'text-tertiary-2'
        )}
      >
        {children}
        <div>{label}</div>
      </div>
    </Link>
  )
})
