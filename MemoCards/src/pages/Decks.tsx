import DecksGrid from '@/features/decks/DecksGrid'
import DecksModifiers from '@/features/decks/DecksModifiers'
import DecksTableOperations from '@/features/decks/DecksTableOperations'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Decks() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Your Decks 📚</Heading>
            </Row>
            <Row type="horizontal">
                <DecksModifiers></DecksModifiers>
                <DecksTableOperations></DecksTableOperations>
            </Row>
            <DecksGrid></DecksGrid>
        </>
    )
}

export default Decks
