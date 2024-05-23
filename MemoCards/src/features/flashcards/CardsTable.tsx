import { useCardsPaginated } from './useCardsPaginated'
import Table from './TableFlashcards'
import Empty from '@/ui/Empty'
import Spinner from '@/ui/Spinner'
import CardRow from './CardRow'
import { PAGE_SIZE_CARDS } from '@/utils/constants'
import Pagination from '@/ui/Pagination'

function CardsTable() {
    const { isLoading, cards, count } = useCardsPaginated()

    console.log(count)

    if (isLoading) return <Spinner></Spinner>

    if (
        !cards?.length ||
        cards === undefined ||
        count === undefined ||
        count === null
    )
        return <Empty resource="cards"></Empty>

    return (
        <Table columns="10rem minmax(30rem,90vw) 10rem 6.5rem">
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
                <Pagination
                    PAGE_SIZE={PAGE_SIZE_CARDS}
                    count={count}
                ></Pagination>
            </Table.Footer>
        </Table>
    )
}

export default CardsTable
