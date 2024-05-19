import React, { ComponentPropsWithoutRef } from 'react'

type InputProps = ComponentPropsWithoutRef<'input'>
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    { ...otherProps },
    ref
) {
    return (
        <input
            ref={ref}
            className={`rounded-md  border-2 border-solid border-mako-grey-200 bg-picton-blue-100 px-4 py-2 text-[1.5rem] text-mako-grey-800 placeholder:text-mako-grey-300 focus:outline-none focus:ring focus:ring-neon-carrot-200 focus:ring-offset-1`}
            {...otherProps}
        />
    )
})

export default Input
