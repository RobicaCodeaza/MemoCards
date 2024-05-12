import {
    ElementType,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from 'react'

type FormProps = {
    children: ReactNode
    variation: 'regular' | 'modal'
} & ComponentPropsWithoutRef<'form'>

function Form({ children, variation, ...otherProps }: FormProps) {
    return (
        <form
            className={`overflow-hidden text-[1.4rem] ${variation === 'regular' ? 'bg-picton-blue-50' : 'w-auto'} flex flex-col items-end gap-10 rounded-md border border-mako-grey-100 px-16 py-10`}
            {...otherProps}
        >
            {children}
        </form>
    )
}

export default Form
