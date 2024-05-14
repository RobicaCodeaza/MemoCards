import DeckCard from './DeckCard'
import Menus from '@/ui/Menus'
import Spinner from '@/ui/Spinner'
import Empty from '@/ui/Empty'
import { useDecks } from './useDecks'

function DecksGrid() {
    const { isLoading, decks } = useDecks()

    if (isLoading) return <Spinner></Spinner>

    if (!decks?.length) return <Empty resource="decks"></Empty>
    return (
        <div className="grid grid-cols-[minmax(32.5rem,45rem)] grid-rows-decks  justify-center gap-16  phone:grid-cols-decks">
            <Menus>
                {decks?.map((deck) => (
                    <DeckCard deck={deck} key={deck.id}></DeckCard>
                ))}
            </Menus>
        </div>
    )
}

export default DecksGrid
