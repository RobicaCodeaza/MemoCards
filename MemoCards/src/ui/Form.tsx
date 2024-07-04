import { type ComponentPropsWithRef, type ReactNode } from 'react'

type FormProps = {
    children: ReactNode
    variation: 'regular' | 'modal'
} & ComponentPropsWithRef<'form'>

function Form({ children, variation, ...otherProps }: FormProps) {
    return (
        <form
            className={`overflow-hidden text-[1.4rem] ${variation === 'regular' ? 'w-full bg-picton-blue-50' : ''} flex  w-[37.5rem] flex-col   gap-4 rounded-md border border-mako-grey-100 px-8 py-4 phone:w-full phone:gap-10 phone:px-6 phone:py-4  tab-port:gap-12 tab-port:px-10 tab-port:py-6 tab-land:gap-14`}
            {...otherProps}
        >
            {children}
        </form>
    )
}

export default Form
