import Grid from '@/ui/Grid'
import DeckCard from './DeckCard'
import Menus from '@/ui/Menus'

import { useDecks } from './useDecks'
import Spinner from '@/ui/Spinner'

function DecksGrid() {
    const { isLoading, decks, error } = useDecks()

    if (isLoading) return <Spinner></Spinner>

    console.log(decks)

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
