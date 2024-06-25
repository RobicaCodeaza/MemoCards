import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dataReceived, reset } from '@/features/quiz/quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import TestingGrid from '@/features/quiz/Testing/TestingGrid'

function Testing() {
    const { quizId } = useParams()
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
