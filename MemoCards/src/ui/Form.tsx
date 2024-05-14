import { type ComponentPropsWithRef, type ReactNode } from 'react'

type FormProps = {
    children: ReactNode
    variation: 'regular' | 'modal'
} & ComponentPropsWithRef<'form'>

function Form({ children, variation, ...otherProps }: FormProps) {
    return (
        <form
            className={`overflow-hidden text-[1.4rem] ${variation === 'regular' ? 'bg-picton-blue-50' : ''}  flex  flex-col gap-10 rounded-md border border-mako-grey-100 px-12 py-8  phone:px-6 phone:py-4 tab-port:px-10 tab-port:py-6`}
            {...otherProps}
        >
            {children}
        </form>
    )
}

export default Form
