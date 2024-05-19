import {
    type ReactNode,
    cloneElement,
    type ComponentPropsWithoutRef,
    ReactElement,
    ElementType,
} from 'react'

type ButtonIconProps = {
    children: ReactNode
    otherClasses?: string
    onClick?: () => void
    positionAlign?: string
    positionJustify?: string
    hoverNone?: 'true'
    as?: ElementType
} & ComponentPropsWithoutRef<ElementType>

function ButtonIcon({
    children,
    onClick,
    otherClasses,
    positionAlign,
    positionJustify,
    hoverNone,
    as,
    ...props
}: ButtonIconProps) {
    const Component = as ?? 'button'

    return (
        <Component
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
        </Component>
    )
}

export default ButtonIcon
