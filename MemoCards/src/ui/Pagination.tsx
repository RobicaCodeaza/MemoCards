import { useSearchParams } from 'react-router-dom'

import { HiChevronDoubleRight } from 'react-icons/hi'
import { HiChevronDoubleLeft } from 'react-icons/hi2'

type PaginationProps = {
    count: number
    PAGE_SIZE: number
}

function Pagination({ count, PAGE_SIZE }: PaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentPage = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1

    const pageCount = Math.ceil(count / PAGE_SIZE)

    function handlePrevPage() {
        const page = currentPage === 1 ? currentPage : currentPage - 1
        searchParams.set('page', String(page))
        setSearchParams(searchParams)
    }
    function handleNextPage() {
        const page = currentPage === pageCount ? currentPage : currentPage + 1
        searchParams.set('page', String(page))
        setSearchParams(searchParams)
    }
    if (pageCount <= 1) return null

    return (
        <div className="flex w-full items-center justify-between px-10 phone:px-14">
            <p className="ml-3 text-[1.4rem]">
                Showing <span className="font-semibold">Page</span> to{' '}
                <span className="font-semibold">X</span> of{' '}
                <span className="font-semibold">Y</span> results
            </p>
            <div className="flex gap-3">
                <button
                    className="text-inherit  flex items-center justify-center gap-2 rounded border-none bg-mako-grey-400 px-5 py-2 text-[1.4rem] font-medium text-mako-grey-50 transition-all duration-300 hover:bg-picton-blue-600
                active:bg-picton-blue-600 active:text-picton-blue-100
                "
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <HiChevronDoubleLeft className="h-7 w-7"></HiChevronDoubleLeft>{' '}
                    <span className="pl-2">Previous</span>
                </button>
                <button
                    className="text-inherit  flex items-center justify-center gap-2 rounded border-none bg-mako-grey-400 px-5 py-2 text-[1.4rem] font-medium text-mako-grey-50 transition-all duration-300 hover:bg-picton-blue-600
                    active:bg-picton-blue-600 active:text-picton-blue-100"
                    onClick={handleNextPage}
                    disabled={currentPage === pageCount}
                >
                    <span className="pr-2">Next</span>
                    <HiChevronDoubleRight className="h-7 w-7"></HiChevronDoubleRight>
                </button>
            </div>
        </div>
    )
}

export default Pagination
