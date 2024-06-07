import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { dataReceived, getQuiz, reset } from '@/features/quiz/quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import TestingGrid from '@/features/quiz/Testing/TestingGrid'

function Testing() {
    const { quizId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        void dispatch(dataReceived(quizId!))

        return function () {
            dispatch(reset())
        }
    }, [quizId, dispatch])

    return (
        <>
            <TestingGrid></TestingGrid>
        </>
    )
}

export default Testing
