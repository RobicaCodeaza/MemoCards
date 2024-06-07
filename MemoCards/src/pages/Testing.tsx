import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { dataReceived, getQuiz, reset } from '@/features/quiz/quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useSelector } from 'react-redux'

function Testing() {
    const { quizId } = useParams()
    const dispatch = useAppDispatch()
    const quiz = useSelector(getQuiz)
    console.log(quiz)

    useEffect(() => {
        void dispatch(dataReceived(quizId!))

        return function () {
            dispatch(reset())
        }
    }, [quizId, dispatch])

    return <div>Testing</div>
}

export default Testing
