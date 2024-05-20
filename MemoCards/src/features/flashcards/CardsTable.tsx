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

    console.log(cards)

    if (!cards?.length) return <Empty resource="cards"></Empty>

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 1fr">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
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
