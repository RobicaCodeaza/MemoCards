import DecksModifiers from '@/features/decks/DecksModifiers'
import DecksTableOperations from '@/features/decks/DecksTableOperations'
import CardsModifiers from '@/features/flashcards/CardsModifiers'
import CardsTable from '@/features/flashcards/CardsTable'
import FlaschardsTableOperation from '@/features/flashcards/FlashcardsTableOperations'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Flashcards() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Your Cards 🃏</Heading>
            </Row>
            <Row type="horizontal">
                <CardsModifiers></CardsModifiers>
                <FlaschardsTableOperation></FlaschardsTableOperation>
            </Row>
            <div className="flex items-center ">
                <CardsTable></CardsTable>
            </div>
        </>
    )
}

export default Flashcards
