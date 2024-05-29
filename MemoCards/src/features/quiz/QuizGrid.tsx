import Pagination from '@/ui/Pagination'
import QuizCard from './QuizCard'

function QuizGrid() {
    return (
        <>
            <div className="mt-[-3rem] grid w-full grid-cols-[minmax(32.5rem,40rem)] grid-rows-decks  justify-center gap-16  border-b  border-mako-grey-200 bg-picton-blue-50 px-5 py-10 phone:grid-cols-decks">
                <QuizCard></QuizCard>
                <QuizCard></QuizCard>
                <QuizCard></QuizCard>
                <QuizCard></QuizCard>
                <QuizCard></QuizCard>
            </div>
            <Pagination count={3} PAGE_SIZE={1}></Pagination>
        </>
    )
}

export default QuizGrid
