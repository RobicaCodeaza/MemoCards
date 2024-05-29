import Pagination from '@/ui/Pagination'
import QuizCard from './QuizCard'

function QuizGrid() {
    return (
        <>
            <div className="mt-[-3rem] flex justify-start  border-b border-t border-mako-grey-200 bg-picton-blue-50">
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
