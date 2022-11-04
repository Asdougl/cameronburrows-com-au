import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faBarcode, faPlane } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

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
  const airport = AIRPORTS[Math.floor(Math.random() * AIRPORTS.length)]

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
            <span className="">SYD</span>
            <FontAwesomeIcon icon={faPlane} />
            <span className="">{airport}</span>
          </div>
        </div>
      </div>
      {/* bottom right */}
      <div className="relative flex flex-col rounded-b-lg bg-tertiary-1 text-background">
        <div className="flex h-full flex-col justify-between px-4 py-2">
          <div className="flex flex-col text-xs font-medium">
            <span>BURROWS /</span>
            <span>CAMERON</span>
          </div>
          <div className="text-xs">SYD to LHR</div>
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
