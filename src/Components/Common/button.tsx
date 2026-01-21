import React from 'react'
import { SpinnerLoader } from '../../icons/spinner'

type Props = {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement | HTMLLabelElement>['onClick']
  type: 'primary' | 'secondary' | 'danger' |'tertiary'
}

export const Button = (props: Props) => {
  const { onClick, className, children ,loading,disabled,type} = props

  return (
    <button
      className={`${className} h-[56px] text-[20px] font-bold text-[#F5F5F5] rounded-[5px] disabled:opacity-[0.6] disabled:cursor-not-allowed
      ${type=='primary'?'bg-[#007FFF]':
        type=='danger'?'bg-[#DB3D3D]':
        type=='tertiary'?'bg-[#3A5F7D]':
      'bg-transparent border border-[#F5F5F5]'}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading?<SpinnerLoader/>:children}
    </button>
  )
}
