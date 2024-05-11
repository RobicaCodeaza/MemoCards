import Grid from '@/ui/Grid'
import DeckCard from './DeckCard'
import Menus from '@/ui/Menus'

function DecksGrid() {
    return (
        <Grid>
            <Menus>
                <DeckCard></DeckCard>
            </Menus>
        </Grid>
    )
}

export default DecksGrid
