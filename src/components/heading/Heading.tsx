import React from 'react'
import style from './Heading.module.css'

type Props = {
    children: React.ReactNode
}

const Heading = (props: Props) => {
    return <h1 className={style.heading}>{props.children}</h1>
}

export { Heading }
