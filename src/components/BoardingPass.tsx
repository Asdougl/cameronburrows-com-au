import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faBarcode, faPlane } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

const AIRPORTS = [
  // europe
  'LHR',
  'GLA',
  'LGW',
  'CDG',
  'AMS',
  'FRA',
  'FCO',
  'BUD',
  'HEL',
  // north america
  'LAX',
  'JFK',
  'HNL',
  'KOA',
  'YYZ',
  // asia
  'DIA',
  'DXB',
  'SGN',
  'HAN',
  'REP',
  'VDH',
  'HKG',
  'SIN',
  // oceania
  'SUV',
  'VLI',
  'AKL',
  'BNE',
]

export const BoardingPass = ({ className }: { className?: string }) => {
  const [airportIndex, setAirportIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    const interval = setInterval(() => {
      setTransitioning(true)
      timeout = setTimeout(() => {
        const nextIndex =
          airportIndex + 1 > AIRPORTS.length - 1 ? 0 : airportIndex + 1
        setAirportIndex(nextIndex)
        setTransitioning(false)
      }, 150)
    }, 1000)

    return () => {
      clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  })

  return (
    <div
      className={classNames(
        'grid grid-cols-3 grid-rows-[32px_1fr] lg:rotate-0',
        className
      )}
    >
      {/* top left */}
      <div className="col-span-2 flex items-center gap-1 rounded-t-lg bg-primary-1 px-2 font-display font-bold text-white">
        <FontAwesomeIcon icon={faReact} /> Frontend Airlines
      </div>
      {/* top right */}
      <div className="relative col-span-1 flex items-center rounded-t-lg bg-primary-1 px-2 font-display text-xs font-bold text-white">
        <span>Boarding Pass</span>
        <div className="absolute top-0 left-0 h-full w-full pt-1">
          <div className="h-full border-l border-dashed border-accent"></div>
        </div>
      </div>
      {/* bottom left */}
      <div className="col-span-2 flex rounded-b-lg bg-tertiary-1 px-2 py-2 pr-8 text-background">
        <div className="flex flex-col gap-1 pr-2">
          <FontAwesomeIcon icon={faBarcode} size="2x" className="rotate-90" />
          <FontAwesomeIcon icon={faBarcode} size="2x" className="rotate-90" />
        </div>
        <div className="flex flex-col font-medium">
          <div className="text-sm lg:text-lg">BURROWS / CAMERON</div>
          <div className="flex items-center gap-2">
            <span className="h-6 w-9 text-center">SYD</span>
            <FontAwesomeIcon icon={faPlane} />
            <span className="h-6 w-9 overflow-hidden">
              <div
                className={classNames(
                  'flex flex-col justify-center',
                  transitioning ? 'transition-transform' : '-translate-y-1/2'
                )}
              >
                <div>{AIRPORTS[airportIndex + 1]}</div>
                <div>{AIRPORTS[airportIndex]}</div>
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
                className={classNames(
                  'flex w-full flex-col justify-center',
                  transitioning ? 'transition-transform' : '-translate-y-1/2'
                )}
              >
                <div>{AIRPORTS[airportIndex + 1]}</div>
                <div>{AIRPORTS[airportIndex]}</div>
              </div>
            </div>
          </div>
          <div className="flex gap-px pr-2">
            <FontAwesomeIcon icon={faBarcode} size="lg" />
            <FontAwesomeIcon icon={faBarcode} size="lg" />
            <FontAwesomeIcon icon={faBarcode} size="lg" />
          </div>
        </div>
        <div className="absolute top-0 left-0 h-full w-full pb-1">
          <div className="h-full border-l border-dashed border-accent"></div>
        </div>
      </div>
    </div>
  )
}
