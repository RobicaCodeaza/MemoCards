import CardsTable from '@/features/flashcards/CardsTable'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Flashcards() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Your Cards 🃏</Heading>
            </Row>
            {/* <Row type="horizontal">
                <DecksModifiers></DecksModifiers>
                <DecksTableOperations></DecksTableOperations>
            </Row> */}
            <div className="flex items-center ">
                <CardsTable></CardsTable>
            </div>
        </>
    )
}

export default Flashcards
