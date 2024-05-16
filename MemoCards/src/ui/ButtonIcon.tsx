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
    positionAlign?: string
    positionJustify?: string
    hoverNone?: 'true'
} & ComponentPropsWithoutRef<'button'>

function ButtonIcon({
    children,
    onClick,
    otherClasses,
    positionAlign,
    positionJustify,
    hoverNone,
    ...props
}: ButtonIconProps) {
    return (
        <button
            className={`flex  items-center justify-center rounded border-none   bg-none p-2
        transition-all duration-200 hover:bg-picton-blue-100 ${!hoverNone ? '' : 'pointer-events-none'}`}
            style={{ alignSelf: positionAlign, justifySelf: positionJustify }}
            onClick={onClick}
            {...props}
        >
            {children &&
                cloneElement(children as ReactElement, {
                    className: `w-12 h-12 
                ${otherClasses ? otherClasses : ''}`,
                })}
        </button>
    )
}

export default ButtonIcon
