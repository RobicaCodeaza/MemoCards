import { useSearchParams } from 'react-router-dom'
import { OptionsType } from './SortBy'

type FilterProps = {
    filteredValue: string
    options: OptionsType
}

function Filter({ filteredValue, options }: FilterProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentFilter =
        searchParams.get(filteredValue) ?? options.at(0)?.value
    console.log(currentFilter)

    function handleChange(value: string) {
        searchParams.set(filteredValue, value)
        if (searchParams.get('page')) searchParams.set('page', '1')
        setSearchParams(searchParams)
    }

    return (
        <div
            className={`flex gap-2 rounded border border-mako-grey-100 bg-mako-grey-50 p-2 shadow-sm`}
        >
            {options.map((option) => (
                <button
                    onClick={() => handleChange(option.value)}
                    key={option.value}
                    disabled={currentFilter === option.value}
                    className={`rounded border-none bg-mako-grey-50 px-2 py-3 text-[1.4rem] font-medium transition-all duration-300 hover:bg-picton-blue-700 hover:text-picton-blue-100 disabled:bg-picton-blue-600 ${currentFilter === option.value ? 'bg-picton-blue-600 text-picton-blue-50' : ''}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default Filter
