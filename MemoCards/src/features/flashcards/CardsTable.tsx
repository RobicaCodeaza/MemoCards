import Menus from '@/ui/Menus'
import { useCards } from './useCards'
import Table from './TableFlashcards'
import Empty from '@/ui/Empty'
import Spinner from '@/ui/Spinner'
import CardRow from './CardRow'

function CardsTable() {
    const { isLoading, cards } = useCards()
    // console.log(bookings);

    if (isLoading) return <Spinner></Spinner>

    if (cards === undefined) return <Empty resource="undefined"></Empty>

    if (!cards?.length) return <Empty resource="cards"></Empty>

    return (
        <Menus>
            <Table columns="0.05fr 1fr 0.125fr">
                <Table.Header>
                    <div className="text-center">Num</div>
                    <div className="text-center">Text(Question/Content)</div>
                    <div className="text-center">Correct answer</div>
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
