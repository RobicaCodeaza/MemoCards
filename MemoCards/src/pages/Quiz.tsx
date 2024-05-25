import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Quiz() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Quiz 💯</Heading>
            </Row>
            <Row type="horizontal">
                {/* <CardsModifiers></CardsModifiers>
                <FlaschardsTableOperation></FlaschardsTableOperation> */}
            </Row>
            <div className="flex items-center ">
                {/* <CardsTable></CardsTable> */}
            </div>
        </>
    )
}

export default Quiz
