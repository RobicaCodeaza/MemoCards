import Grid from '@/ui/Grid'
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
        <Grid>
            <Menus>
                {decks?.map((deck) => (
                    <DeckCard deck={deck} key={deck.id}></DeckCard>
                ))}
            </Menus>
        </Grid>
    )
}

export default DecksGrid
