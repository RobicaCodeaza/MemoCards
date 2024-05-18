import { type ComponentPropsWithoutRef } from 'react'
import { OptionsType } from './SortBy'

type SelectProps = {
    options: OptionsType
    value: string
} & ComponentPropsWithoutRef<'select'>

function Select({ options, value, ...otherProps }: SelectProps) {
    return (
        <select
            className="rounded border border-mako-grey-100 bg-mako-grey-50 px-3 py-5 text-[1.4rem] font-medium shadow-sm"
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
}

export default Select
