'use client'

import { useEffect, useState } from 'react'
import {
  ArrowSmallRightIcon,
  Bars4Icon,
  CodeBracketSquareIcon,
} from '@heroicons/react/24/outline'
import { twsx } from '../util/tw'
import { AIRPORTS } from '../util/constants'

export const BoardingPass = ({
  className,
  airports = AIRPORTS,
}: {
  className?: string
  airports?: string[]
}) => {
  const [airportIndex, setAirportIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    const interval = setInterval(() => {
      setTransitioning(true)
      timeout = setTimeout(() => {
        setAirportIndex((curr) =>
          curr + 1 > airports.length - 1 ? 0 : curr + 1
        )
        setTransitioning(false)
      }, 150)
    }, 1000)

    return () => {
      clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  }, [airports])

  return (
    <div
      className={twsx(
        'grid grid-cols-3 grid-rows-[32px_1fr] lg:rotate-0',
        className
      )}
    >
      {/* top left */}
      <div className="col-span-2 flex items-center gap-1 rounded-t-lg bg-primary-1 px-2 font-display font-bold text-white">
        <div className="px-2">
          <CodeBracketSquareIcon height={16} width={16} />
        </div>
        <div>Frontend Airlines</div>
      </div>
      {/* top right */}
      <div className="relative col-span-1 flex items-center rounded-t-lg bg-primary-1 px-2 font-display text-xs font-bold text-white">
        <span>Boarding Pass</span>
        <div className="absolute top-0 left-0 h-full w-full pt-1">
          <div className="h-full border-l border-dashed border-accent"></div>
        </div>
      </div>
      {/* bottom left */}
      <div className="col-span-2 flex rounded-b-lg bg-tertiary-1 px-2 py-1 pr-8 text-background">
        <div className="flex flex-col pr-2">
          <Bars4Icon height={32} className="mb-[-8px]" />
          <Bars4Icon height={32} className="mb-[-8px]" />
          <Bars4Icon height={32} />
        </div>
        <div className="flex flex-col font-medium py-1">
          <div className="text-sm lg:text-lg">BURROWS / CAMERON</div>
          <div className="flex items-center gap-2">
            <span className="h-6 w-9 text-center">SYD</span>
            <ArrowSmallRightIcon height={16} width={16} />
            <span className="h-6 w-9 overflow-hidden">
              <div
                className={twsx(
                  'flex flex-col justify-center',
                  transitioning ? 'transition-transform' : '-translate-y-1/2'
                )}
              >
                <div>{airports[airportIndex + 1]}</div>
                <div>{airports[airportIndex]}</div>
              </div>
            </span>
          </div>
          <div className="px-1 font-mono text-sm font-normal">FEF-62</div>
        </div>
      </div>
      {/* bottom right */}
      <div className="relative flex flex-col rounded-b-lg bg-tertiary-1 text-background">
        <div className="flex h-full flex-col justify-between px-4 py-2">
          <div className="flex flex-col text-xs font-medium">
            <span>BURROWS /</span>
            <span>CAMERON</span>
          </div>
          <div className="flex gap-1 text-xs">
            <div className="h-4 w-7 text-center">SYD</div>
            <div>to</div>
            <div className="h-4 w-7 overflow-hidden">
              <div
                className={twsx(
                  'flex w-full flex-col justify-center',
                  transitioning ? 'transition-transform' : '-translate-y-1/2'
                )}
              >
                <div>{airports[airportIndex + 1]}</div>
                <div>{airports[airportIndex]}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-px pr-2">
            <Bars4Icon width={20} className="rotate-90" />
            <Bars4Icon width={20} className="rotate-90 ml-[-6px]" />
            <Bars4Icon width={20} className="rotate-90 ml-[-6px]" />
            <Bars4Icon width={20} className="rotate-90 ml-[-6px]" />
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full w-full pb-1">
          <div className="h-full border-l border-dashed border-accent"></div>
        </div>
      </div>
    </div>
  )
}
