import React from 'react'
import { SpinnerLoader } from '../icons/spinner'

type Props = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement | HTMLLabelElement>['onClick']
  type: 'primary' | 'secondary' 
}

export const Button = (props: Props) => {
  const { onClick, className, children ,loading,disabled,type} = props

  return (
    <button
      className={`h-[56px] text-[20px] font-bold text-[#F5F5F5] rounded-[5px] ${type=='primary'?'bg-[#007FFF]':'bg-transparent border border-[#F5F5F5]'} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading?<SpinnerLoader/>:children}
    </button>
  )
}
