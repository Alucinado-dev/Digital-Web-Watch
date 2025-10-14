import style from './Container.module.css'

type ContainerProps = {
    children: React.ReactNode
    isFluid: boolean
}

const Container = ({children, isFluid = true} : ContainerProps) => {

    return(
        <div className={isFluid ? style.containerFluid : style.container}>
            <div className={style.content}>
                {children}
            </div>
        </div>
    )
}

export default Container