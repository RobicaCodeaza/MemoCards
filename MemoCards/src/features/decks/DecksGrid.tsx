import DeckCard from './DeckCard'
import Menus from '@/ui/Menus'
import Spinner from '@/ui/Spinner'
import Empty from '@/ui/Empty'
import { useSearchParams } from 'react-router-dom'
import { Tables } from '@/types/database.types'
import Pagination from '@/ui/Pagination'
import { useDecksPaginated } from './useDecksPaginated'
import { useDecks } from './useDecks'
import { PAGE_SIZE_DECKS } from '@/utils/constants'

function DecksGrid() {
    const [searchParams, _] = useSearchParams()
    const { isLoading, decks, count } = useDecksPaginated()

    if (isLoading) return <Spinner></Spinner>

    if (
        !decks?.length ||
        decks === undefined ||
        count === undefined ||
        count === null
    )
        return <Empty resource="decks"></Empty>

    // 1.Filter
    const filterValue = searchParams.get('tested') ?? 'all'
    let filteredDecks

    if (filterValue === 'all') filteredDecks = decks
    if (filterValue === 'not-tested')
        filteredDecks = decks.filter((deck) => deck.lastTested === null)
    if (filterValue === 'tested')
        filteredDecks = decks.filter((deck) => deck.lastTested !== null)

    // 2.Sort
    const sortBy = searchParams.get('sortBy') ?? 'chapter-asc'
    const [field, direction] = sortBy.split('-') as [
        keyof Tables<'Decks'>,
        'asc' | 'desc',
    ]

    const modifier = direction === 'asc' ? 1 : -1

    const sortedDecks = filteredDecks?.sort((a, b) => {
        const aValue = a[field]
        const bValue = b[field]

        if (aValue === null || bValue === null) {
            return 0 // Handle null or undefined values
        }

        if (Array.isArray(aValue) && Array.isArray(bValue)) {
            if (
                aValue.every((item) => typeof item === 'string') &&
                bValue.every((item) => typeof item === 'string')
            ) {
                // Handle date strings
                const aDate = new Date(aValue[aValue.length - 1] as string)
                const bDate = new Date(bValue[aValue.length - 1] as string)
                return modifier * (aDate.getTime() - bDate.getTime())
            } else {
                const aNumber = aValue[aValue.length - 1] as number
                const bNumber = bValue[bValue.length - 1] as number
                return modifier * (aNumber - bNumber)
            }
        } else {
            if (typeof aValue === 'string' && typeof bValue === 'string')
                return modifier * aValue.localeCompare(bValue)
            else {
                const aNumber = aValue as number
                const bNumber = bValue as number
                return modifier * (aNumber - bNumber)
            }
        }
    })

    return (
        <div className="grid w-full grid-cols-[minmax(32.5rem,45rem)]  grid-rows-decks justify-center  gap-16 phone:grid-cols-decks">
            <Menus>
                {sortedDecks?.map((deck) => (
                    <DeckCard deck={deck} key={deck.id}></DeckCard>
                ))}
            </Menus>

            <Pagination count={count} PAGE_SIZE={PAGE_SIZE_DECKS}></Pagination>
        </div>
    )
}

export default DecksGrid
