import { useSearchParams } from 'react-router-dom'
import Select from './Select'
import { ChangeEvent } from 'react'

export type OptionsType = { value: string; label: string }[]

type SortByProps = {
    options: OptionsType
}

function SortBy({ options }: SortByProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentSortBy = searchParams.get('sortBy') ?? ''

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }

    return (
        <Select
            onChange={handleChange}
            options={options}
            value={currentSortBy}
        ></Select>
    )
}

export default SortBy
