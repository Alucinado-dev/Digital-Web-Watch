import React, { type HTMLAttributes } from 'react'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode
}

const Heading = ({ children }: HeadingProps) => {
  return (
    <h1 className="p-">
      {children}
    </h1>
  )
}


export { Heading }
