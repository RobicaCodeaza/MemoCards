import {
    type ReactNode,
    cloneElement,
    type ComponentPropsWithoutRef,
    ReactElement,
} from 'react'

type ButtonIconProps = {
    children: ReactNode
    otherClasses?: string
    onClick?: () => void
} & ComponentPropsWithoutRef<'button'>

function ButtonIcon({
    children,
    onClick,
    otherClasses,
    ...props
}: ButtonIconProps) {
    return (
        <button
            className="flexitems-center  justify-center rounded border-none bg-none   p-2 transition-all
        duration-200 hover:bg-picton-blue-100"
            onClick={onClick}
            {...props}
        >
            {children &&
                cloneElement(children as ReactElement, {
                    className: `w-12 h-12 text-picton-blue-600
                ${otherClasses ? otherClasses : ''}`,
                })}
        </button>
    )
}

export default ButtonIcon
