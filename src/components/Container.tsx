import React from 'react'

type ContainerProps = {
  children?: React.ReactNode,
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={`max-w-custom mx-auto md:px-7 px-4 ${className}`}>{children}</div >
}
