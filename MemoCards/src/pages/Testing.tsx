import { useParams } from 'react-router-dom'

function Testing() {
    const { quizId } = useParams()
    console.log(quizId)

    return <div>Testing</div>
}

export default Testing
