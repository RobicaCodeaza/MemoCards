import Heading from '@/ui/Heading'
import { getQuizNumQuestions, start } from '../quizSlice'
import Button from '@/ui/Button'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useAppSelector } from '@/hooks/useAppSelector'

function StartScreen() {
    const dispatch = useAppDispatch()
    const numQuestions = useAppSelector(getQuizNumQuestions)

    return (
        <div className="flex h-full flex-col items-center gap-14 p-12">
            <div className="mb-auto flex flex-col items-center justify-center gap-2 text-center">
                <Heading as="h2">Welcome to your quiz.</Heading>
                <Heading as="h3">
                    {numQuestions} questions to master your lessons.
                </Heading>
            </div>
            <DotLottieReact
                autoplay
                src="/startExamAnim.lottie"
                loop
            ></DotLottieReact>
            <Button
                variation="simpleSecondary"
                size="medium"
                otherClasses="mt-auto"
                onClick={() => dispatch(start())}
            >
                Let&apos;s start
            </Button>
        </div>
    )
}

export default StartScreen
