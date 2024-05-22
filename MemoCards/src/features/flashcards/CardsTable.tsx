import Menus from '@/ui/Menus'
import { useCards } from './useCards'
import Table from './TableFlashcards'
import Empty from '@/ui/Empty'
import Spinner from '@/ui/Spinner'
import CardRow from './CardRow'

function CardsTable() {
    const { isLoading, cards, count } = useCards()

    if (isLoading) return <Spinner></Spinner>

    if (!cards?.length || cards === undefined)
        return <Empty resource="cards"></Empty>

    return (
        <Menus>
            <Table columns="0.05fr 1fr 0.125fr 0.055fr">
                <Table.Header>
                    <div className="text-center">Num</div>
                    <div className="text-center">Text(Question/Answer)</div>
                    <div className="text-center">Correct answer</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={cards}
                    render={(card, index) => (
                        <CardRow index={index} key={card.id} card={card} />
                    )}
                />
                <Table.Footer>
                    {/* <Pagination count={count}></Pagination> */}
                    Pagination
                </Table.Footer>
            </Table>
        </Menus>
    )
}

export default CardsTable