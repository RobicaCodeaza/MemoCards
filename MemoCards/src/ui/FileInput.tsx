import React, { ComponentPropsWithRef } from 'react'

type FileInputProps = ComponentPropsWithRef<'input'>

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
    function FileInput({ ...otherProps }, ref) {
        return (
            <input
                ref={ref}
                type="file"
                className="file:text-inherit rounded-md text-[1.4rem] file:mr-4 file:cursor-pointer file:rounded-md file:border-none file:bg-neon-carrot-600 file:px-5 file:py-3 file:font-medium file:text-neon-carrot-50 file:transition-all hover:file:bg-neon-carrot-700"
                {...otherProps}
            />
        )
    }
)

export default FileInput
