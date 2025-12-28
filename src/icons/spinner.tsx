import React from "react"


export const SpinnerLoader = ({...props }) => {
  return (
    <svg
      width={41}
      height={40}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={'animate-spin text-[#F5F5F5]'}
      {...props}
    >
      <path
        opacity={0.3}
        d="M20.5 35c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 5c8.284 0 15 6.716 15 15 0 4.29-1.8 8.159-4.688 10.893"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
