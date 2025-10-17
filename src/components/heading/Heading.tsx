import React from 'react'


type HeadingProps = {
  children: React.ReactNode
}

const Heading = ({ children }: HeadingProps) => {
  return <h1 className='text-[var(--heading-color)] text-6xl font-bold font-(family-name:--heading-font) text-shadow-[var(--heading-shadow)] '>{children}</h1>
}

export { Heading }
