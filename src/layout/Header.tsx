'use client'

import Link from 'next/link'
import {
  ArchiveBoxIcon,
  Bars3Icon,
  CodeBracketIcon,
  GlobeEuropeAfricaIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Menu } from '@headlessui/react'
import { motion } from 'framer-motion'
import { MotionNavLink, NavLink } from '../components/NavLink'
import { twsx } from '../util/tw'

const ICON_SIZE = 20
const MOB_ICON_SIZE = 20

export const Header = () => {
  return (
    <header className="z-20 border-b-2 border-tertiary-3">
      <div className="container mx-auto flex h-full w-full items-center justify-between gap-4">
        <Link href="/">
          <motion.div
            initial="hidden"
            whileHover="show"
            className="flex items-center gap-4 px-8 hover:opacity-60 lg:px-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1502 1502"
              className="h-8 w-8"
            >
              <path
                fill="currentColor"
                d="M760.764,990.111c-72.051,68.7-144.495,99.369-191.058,72.489a0.147,0.147,0,0,0-.013-0.01h0C458.155,998.2,394.149,883.128,389.9,763.255,125.237,576.636-36.007,397.724,7.522,322.33c42.369-73.385,266.671-27.8,549.662,100l-20.659,13.741-19.16,13.187-22.2,19.686c-171.625-70.51-298.587-94.058-323.093-51.612-38.384,66.482,189.118,269.69,508.139,453.877s608.754,279.6,647.134,213.123c24.5-42.43-59.29-140.544-206.06-253.863l3.73-17.685,4.24-33.347,1.95-25.6c251.72,180.984,403.02,352.181,360.69,425.491C1440.78,1267.85,1124.98,1183.27,760.764,990.111ZM690.091,854.086c-105.553-60.94-203.532-124.045-290.786-186.3a360.014,360.014,0,0,1,38.618-96.963C537.315,398.671,757.424,339.667,929.6,439c0.036,0.021.074,0.038,0.111,0.059,74.614,43.079,54.511,217.584-44.9,389.77a798.292,798.292,0,0,1-65.428,96.647Q755.513,891.811,690.091,854.086Z"
              />
            </svg>
            <div className="hidden font-display text-2xl sm:block overflow-y-hidden h-8">
              <motion.div
                variants={{
                  hidden: {
                    y: 0,
                  },
                  show: {
                    y: -36,
                  },
                }}
                className="flex flex-col gap-1"
              >
                <span>Cameron Burrows</span>
                <span className="text-tertiary-2">Home</span>
              </motion.div>
            </div>
          </motion.div>
        </Link>
        <nav className="hidden gap-4 lg:flex">
          <MotionNavLink href="/blob/tech" label="Tech">
            <CodeBracketIcon height={ICON_SIZE} width={ICON_SIZE} />
          </MotionNavLink>
          <MotionNavLink href="/blog/travel" label="Travel">
            <GlobeEuropeAfricaIcon height={ICON_SIZE} width={ICON_SIZE} />
          </MotionNavLink>
          <MotionNavLink href="/blog/misc" label="Misc">
            <ArchiveBoxIcon height={ICON_SIZE} width={ICON_SIZE} />
          </MotionNavLink>
          <MotionNavLink href="/blog/search" label="Search">
            <MagnifyingGlassIcon height={ICON_SIZE} width={ICON_SIZE} />
          </MotionNavLink>
        </nav>
        <Menu as="nav" className="relative h-full lg:hidden">
          <Menu.Button className="flex h-full items-center gap-4 px-8">
            {(props) => (
              <div className="relative h-8 w-8">
                <Bars3Icon
                  height={24}
                  width={24}
                  className={twsx(
                    props.open ? 'rotate-90 opacity-0' : 'opacity-100',
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all'
                  )}
                />
                <XMarkIcon
                  height={24}
                  width={24}
                  className={twsx(
                    props.open ? 'opacity-100' : 'rotate-90 opacity-0',
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all'
                  )}
                />
              </div>
            )}
          </Menu.Button>
          <Menu.Items className="absolute right-0 top-full w-screen bg-background shadow-lg text-2xl pb-6">
            <Menu.Item>
              <NavLink href="/blog/tech" label="Tech">
                <CodeBracketIcon height={MOB_ICON_SIZE} width={MOB_ICON_SIZE} />
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink href="/blog/travel" label="Travel">
                <GlobeEuropeAfricaIcon
                  height={MOB_ICON_SIZE}
                  width={MOB_ICON_SIZE}
                />
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink href="/blog/misc" label="Misc">
                <ArchiveBoxIcon height={MOB_ICON_SIZE} width={MOB_ICON_SIZE} />
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink href="/blog/search" label="Search">
                <MagnifyingGlassIcon
                  height={MOB_ICON_SIZE}
                  width={MOB_ICON_SIZE}
                />
              </NavLink>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  )
}
