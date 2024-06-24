import {
    type ReactNode,
    type ComponentPropsWithoutRef,
    type ElementType,
} from 'react'

type ButtonProps<T extends ElementType> = {
    as?: T
    variation:
        | 'accentPrimary'
        | 'accentSecondary'
        | 'accentTertiary'
        | 'simplePrimary'
        | 'simpleSecondary'
        | 'simpleTertiary'
        | 'subtleGrey'
        | 'subtleWhite'
        | 'danger'
    size: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
    children: ReactNode
    otherClasses?: string
    handleClick?: () => void
} & ComponentPropsWithoutRef<T>

function Button<C extends ElementType>({
    as,
    variation,
    children,
    size,
    otherClasses,
    handleClick,
    ...props
}: ButtonProps<C>) {
    function onClickFunction() {
        handleClick?.()
    }

    const button = {
        variation: {
            fancyPrimary: '',
            fancySecondary: '',
            accentPrimary:
                'rounded bg-picton-blue-500 hover:bg-picton-blue-600 text-mako-grey-50 hover:text-mako-grey-50 active:bg-picton-blue-700  active:text-mako-grey-100',
            accentSecondary:
                'rounded bg-neon-carrot-500 hover:bg-neon-carrot-600 text-mako-grey-50 hover:text-mako-grey-50 active:bg-neon-carrot-700  active:text-mako-grey-100',
            accentTertiary:
                'rounded bg-chateau-green-500 hover:bg-chateau-green-600 text-mako-grey-50 hover:text-mako-grey-50 active:bg-chateau-green-700  active:text-mako-grey-100',
            simplePrimary: `border rounded border-picton-blue-500 hover:border-picton-blue-600 text-picton-blue-500 hover:text-picton-blue-600 active:border-picton-blue-700  active:text-picton-blue-700`,
            simpleTertiary: `border rounded border-chateau-green-500 hover:border-chateau-green-600 text-chateau-green-500 hover:text-chateau-green-600 active:border-chateau-green-700  active:text-chateau-green-700`,
            simpleSecondary: `border rounded border-neon-carrot-500 hover:border-neon-carrot-600 text-neon-carrot-500 hover:text-neon-carrot-600 active:border-neon-carrot-700  active:text-neon-carrot-700`,
            subtleGrey:
                'bg-mako-grey-100 rounded outline outline-offset-0 outline-none   text-mako-grey-500 hover:bg-mako-grey-50  hover:text-mako-grey-700 hover:outline-2 hover:outline-picton-blue-400 focus:bg-mako-grey-50',
            subtleWhite:
                'bg-picton-blue-50 rounded outline outline-none outline-offset-0  text-mako-grey-500  hover:text-mako-grey-700 hover:outline-2  hover:outline-picton-blue-400',
            danger: 'rounded bg-danger-600 hover:bg-danger-700 text-mako-grey-100 hover:text-mako-grey-200 active:bg-danger-800  active:text-mako-grey-300',
        },
        size: {
            tiny: 'px-2 py-1 text-center text-[1.2rem] font-medium uppercase',
            small: 'px-3 py-1 text-center text-[1.3rem] font-semibold uppercase tracking-wider phone:px-4 py-2',
            medium: 'px-7 py-3 text-[1.4rem] tracking-wide',
            large: 'px-10 py-5 text-[1.6rem] ',
            huge: 'px-12 py-6 text-[2.4rem]',
        },
    }

    const Component = as ?? 'button'
    return (
        <Component
            onClick={onClickFunction}
            className={`flex cursor-pointer items-center justify-center gap-1  ${button.variation[variation]} ${button.size[size]} ${otherClasses}`}
            {...props}
        >
            {children}
        </Component>
    )
}

export default Button
