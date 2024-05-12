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
} & ComponentPropsWithoutRef<'button'>

function ButtonIcon({
    children,
    onClick,
    otherClasses,
    positionAlign,
    positionJustify,
    ...props
}: ButtonIconProps) {
    return (
        <button
            className={`flex  items-center justify-center rounded border-none   bg-none p-2
        transition-all duration-200 hover:bg-picton-blue-100`}
            style={{ alignSelf: positionAlign, justifySelf: positionJustify }}
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
