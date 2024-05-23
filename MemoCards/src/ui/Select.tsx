import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { OptionsType } from './SortBy'

type SelectProps = {
    options: OptionsType
    value?: string
} & ComponentPropsWithoutRef<'select'>

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    { options, value, ...otherProps },
    ref
) {
    return (
        <select
            ref={ref}
            className="w-[18.5rem] rounded border border-mako-grey-100 bg-picton-blue-50 px-2 py-4 text-[1.4rem] font-medium shadow-sm phone:px-3 phone:py-5 tab-land:w-auto"
            value={value}
            {...otherProps}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
})

export default Select
