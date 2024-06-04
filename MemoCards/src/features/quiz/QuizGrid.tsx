import Pagination from '@/ui/Pagination'
import QuizCard from './QuizCard'
import Menus from '@/ui/Menus'
import { Tables } from '@/types/database.types'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'
import Empty from '@/ui/Empty'

type QuizGridProps = {
    quizes: Tables<'Quizes'>[]
    count: number
}

function QuizGrid({ quizes, count }: QuizGridProps) {
    return (
        <>
            <Menus>
                <div className="mt-[-3rem] grid  grid-cols-[minmax(32.5rem,40rem)] grid-rows-decks  justify-center gap-16  border-b  border-mako-grey-200 bg-picton-blue-50 px-5 py-10 phone:grid-cols-decks">
                    {quizes.map((quiz, index) => (
                        <QuizCard key={index} quiz={quiz}></QuizCard>
                    ))}
                </div>
            </Menus>
            <Pagination count={count} PAGE_SIZE={PAGE_SIZE_QUIZES}></Pagination>
        </>
    )
}

export default QuizGrid
