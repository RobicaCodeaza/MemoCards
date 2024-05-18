import DeckCard from './DeckCard'
import Menus from '@/ui/Menus'
import Spinner from '@/ui/Spinner'
import Empty from '@/ui/Empty'
import { useDecks } from './useDecks'
import { useSearchParams } from 'react-router-dom'
import { Tables } from '@/types/database.types'

function DecksGrid() {
    const [searchParams, _] = useSearchParams()
    const { isLoading, decks } = useDecks()

    if (isLoading) return <Spinner></Spinner>

    if (!decks?.length) return <Empty resource="decks"></Empty>

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

        if (aValue == null || bValue == null) {
            return 0 // Handle null or undefined values
        }

        if (typeof aValue === 'number[]' && typeof bValue !== 'number') {
            if (field === 'perfectionScore') {
                // Handle date strings
                const aValue2 = aValue[aValue.length - 1]
                const bValue2 = bValue[aValue.length - 1]
                return modifier * (aValue2 - bValue2)
            }
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
            if (field === 'lastTested') {
                // Handle date strings
                const aDate = new Date(aValue[aValue.length - 1])
                const bDate = new Date(bValue[aValue.length - 1])
                return modifier * (aDate.getTime() - bDate.getTime())
            } else {
                return modifier * aValue.localeCompare(bValue)
            }
        }
        return modifier * (a[field] - b[field])
    })

    return (
        <div className="grid w-full grid-cols-[minmax(32.5rem,45rem)]  grid-rows-decks justify-center  gap-16 phone:grid-cols-decks">
            <Menus>
                {sortedDecks?.map((deck) => (
                    <DeckCard deck={deck} key={deck.id}></DeckCard>
                ))}
            </Menus>
        </div>
    )
}

export default DecksGrid
