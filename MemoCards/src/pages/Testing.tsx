import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dataReceived } from '@/features/quiz/quizSlice'
import { useAppDispatch } from '@/services/store'

function Testing() {
    const { quizId } = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        void dispatch(dataReceived(quizId!))
    }, [quizId, dispatch])

    return <div>Testing</div>
}

export default Testing
