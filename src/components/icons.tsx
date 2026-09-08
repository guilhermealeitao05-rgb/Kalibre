import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
}

export function IconHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11L12 4L20 11" />
      <path d="M6 10V20H18V10" />
      <line x1="10" y1="20" x2="10" y2="14" />
      <line x1="14" y1="20" x2="14" y2="14" />
    </svg>
  )
}

export function IconLibrary(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="4" x2="5" y2="20" />
      <line x1="10" y1="4" x2="10" y2="20" />
      <line x1="15" y1="6" x2="19" y2="20" />
      <line x1="4" y1="4" x2="11" y2="4" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </svg>
  )
}

export function IconHistory(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <rect x="3" y="10" width="4" height="4" />
      <rect x="10" y="10" width="4" height="4" />
      <rect x="17" y="10" width="4" height="4" />
    </svg>
  )
}

export function IconProfile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7 18C7.8 15.5 9.6 14.5 12 14.5C14.4 14.5 16.2 15.5 17 18" />
    </svg>
  )
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12.5L9.5 18L20 6" />
    </svg>
  )
}

export function IconCart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5H6L8.5 16H18L20 8H7" />
      <circle cx="9.5" cy="19.5" r="1.2" />
      <circle cx="17" cy="19.5" r="1.2" />
    </svg>
  )
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="4" y1="12" x2="19" y2="12" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  )
}

export function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

export function IconChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5L16 12L9 19" />
    </svg>
  )
}

export function IconSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="10" height="10" />
      <line x1="14" y1="14" x2="20" y2="20" />
    </svg>
  )
}

export function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3L5 13H11L10 21L19 10H13L13 3Z" />
    </svg>
  )
}

export function IconTrain(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="4" width="14" height="13" />
      <line x1="5" y1="9" x2="19" y2="9" />
      <line x1="9" y1="20" x2="9" y2="17" />
      <line x1="15" y1="20" x2="15" y2="17" />
    </svg>
  )
}

export function IconRest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="11" width="14" height="9" />
      <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" />
    </svg>
  )
}
