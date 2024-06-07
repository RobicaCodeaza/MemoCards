import { useAppSelector } from '@/hooks/useAppSelector'
import Heading from '@/ui/Heading'
import { getQuizNumQuestions, start } from '../quizSlice'
import Button from '@/ui/Button'
import { useAppDispatch } from '@/hooks/useAppDispatch'

function StartScreen() {
    const numQuestions = useAppSelector(getQuizNumQuestions)
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col items-center">
            <Heading as="h2">Welcome to your quiz</Heading>
            <Heading as="h3">3 questions to master your lessons.</Heading>
            <Button
                variation="simpleTertiary"
                size="tiny"
                onClick={() => dispatch(start(30))}
            >
                Let&apos;s start
            </Button>
        </div>
    )
}

export default StartScreen
