import {
    type ReactNode,
    cloneElement,
    type ComponentPropsWithoutRef,
} from 'react'

type ButtonIconProps = {
    children: ReactNode
    otherClasses?: string
} & ComponentPropsWithoutRef<'button'>

function ButtonIcon({ children, otherClasses, ...props }: ButtonIconProps) {
    return (
        <button
            className="flexitems-center  justify-center rounded border-none bg-none   p-2 transition-all
        duration-200 hover:bg-picton-blue-100"
            {...props}
        >
            {cloneElement(children, {
                className: `w-12 h-12 text-picton-blue-600
                ${otherClasses ? otherClasses : ''}`,
            })}
        </button>
    )
}

export default ButtonIcon
