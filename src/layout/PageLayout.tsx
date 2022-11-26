import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faBoxArchive,
  faCode,
  faPlaneDeparture,
  faSearch,
  faTimes,
} from '@fortawesome/pro-regular-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Menu } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
}

const NavLink = forwardRef<HTMLAnchorElement, PropsWithChildren<NavLinkProps>>(
  function NavLinkComponent({ href, children }, ref) {
    const router = useRouter()

    const isActive = router.pathname === href

    return (
      <Link href={href}>
        <a
          ref={ref}
          className={classNames(
            'group relative flex w-full items-center justify-start gap-2 rounded-xl py-4 px-4 font-display transition-colors hover:bg-accent hover:text-tertiary-2 lg:w-32 lg:justify-center lg:py-2',
            isActive ? 'text-tertiary-1' : 'text-tertiary-3'
          )}
        >
          {children}
        </a>
      </Link>
    )
  }
)

export const PageLayout: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className="grid min-h-screen grid-rows-[80px_1fr_180px] bg-background">
      <header className="z-20 border-b-2 border-tertiary-3">
        <div className="container mx-auto flex h-full w-full items-center justify-between gap-4">
          <Link href="/">
            <a className="flex items-center gap-4 px-8 hover:opacity-60 lg:px-0">
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
              <div className="hidden font-display text-2xl lg:block">
                Cameron Burrows
              </div>
            </a>
          </Link>
          <nav className="hidden gap-4 lg:flex">
            <NavLink href="/blog/tech">
              <FontAwesomeIcon icon={faCode} size="sm" />
              <div>Tech</div>
            </NavLink>
            <NavLink href="/blog/travel">
              <FontAwesomeIcon icon={faPlaneDeparture} size="sm" />
              <div>Travel</div>
            </NavLink>
            <NavLink href="/blog/misc">
              <FontAwesomeIcon icon={faBoxArchive} size="sm" />
              <div>Misc</div>
            </NavLink>
            <NavLink href="/blog/search">
              <FontAwesomeIcon icon={faSearch} size="sm" />
              <div>Search</div>
            </NavLink>
          </nav>
          <Menu as="nav" className="relative h-full lg:hidden">
            <Menu.Button className="flex h-full items-center gap-4 px-8">
              {(props) => (
                <div className="relative h-8 w-8">
                  <FontAwesomeIcon
                    icon={faBars}
                    size="lg"
                    fixedWidth
                    className={classNames(
                      props.open ? 'rotate-90 opacity-0' : 'opacity-100',
                      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all'
                    )}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    size="lg"
                    fixedWidth
                    className={classNames(
                      props.open ? 'opacity-100' : 'rotate-90 opacity-0',
                      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all'
                    )}
                  />
                </div>
              )}
            </Menu.Button>
            <Menu.Items className="absolute right-0 top-full w-screen bg-background shadow-lg">
              <Menu.Item>
                <NavLink href="/blog/tech">
                  <FontAwesomeIcon fixedWidth icon={faCode} size="sm" />
                  <div>Tech</div>
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink href="/blog/travel">
                  <FontAwesomeIcon
                    fixedWidth
                    icon={faPlaneDeparture}
                    size="sm"
                  />
                  <div>Travel</div>
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink href="/blog/misc">
                  <FontAwesomeIcon fixedWidth icon={faBoxArchive} size="sm" />
                  <div>Misc</div>
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink href="/blog/search">
                  <FontAwesomeIcon fixedWidth icon={faSearch} size="sm" />
                  <div>Search</div>
                </NavLink>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </header>
      <main className={className}>{children}</main>
      <footer className="container mx-auto flex h-full flex-col items-center justify-between gap-4 py-10 font-display text-lg text-tertiary-2 lg:flex-row">
        <div className="flex items-center gap-4 lg:flex-col">
          <div className="font-medium">Cameron Burrows</div>
          <div className="flex gap-4">
            <a
              href="https://github.com/Asdougl"
              className="hover:text-white/80"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://twitter.com/_asdougl"
              className="hover:text-white/80"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        <div>Copyright &copy; Cameron Burrows {new Date().getFullYear()}</div>
      </footer>
    </div>
  )
}
