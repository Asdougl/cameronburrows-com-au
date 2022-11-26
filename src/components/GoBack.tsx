import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import type { FC } from 'react'

interface GoBackProps {
  href: string
  text?: string
}

export const GoBack: FC<GoBackProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <a className="group rounded-xl px-4 py-2 text-tertiary-2 hover:bg-accent">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="translate-x-1 pr-3 transition-transform group-hover:translate-x-0"
        />
        {text || 'Back'}
      </a>
    </Link>
  )
}
