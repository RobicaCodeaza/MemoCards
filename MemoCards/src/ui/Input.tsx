import { ComponentPropsWithoutRef } from 'react'

type InputProps = {
    id: string
    type: string
} & ComponentPropsWithoutRef<'input'>
function Input({ id, type, ...otherProps }: InputProps) {
    return (
        <input
            type={type}
            id={id}
            className="text[1.6rem]  rounded-md border-2 border-solid border-mako-grey-200 bg-picton-blue-100 px-4 py-2 text-mako-grey-800 focus:outline-none focus:ring focus:ring-neon-carrot-200 focus:ring-offset-1"
            {...otherProps}
        />
    )
}

export default Input
