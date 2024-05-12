import {
    type ComponentPropsWithRef,
    type ComponentPropsWithoutRef,
    type ReactNode,
} from 'react'

type FormProps = {
    children: ReactNode
    variation: 'regular' | 'modal'
} & ComponentPropsWithRef<'form'>

function Form({ children, variation, ...otherProps }: FormProps) {
    return (
        <form
            className={`overflow-hidden text-[1.4rem] ${variation === 'regular' ? 'bg-picton-blue-50' : 'w-auto'}  flex max-w-[45rem] flex-col  gap-10 rounded-md border border-mako-grey-100 px-16 py-10`}
            {...otherProps}
        >
            {children}
        </form>
    )
}

export default Form
