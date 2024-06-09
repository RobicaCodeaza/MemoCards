import Heading from '@/ui/Heading'
import { start } from '../quizSlice'
import Button from '@/ui/Button'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function StartScreen() {
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col items-center gap-14 p-12">
            <div className="flex flex-col items-center gap-2">
                <Heading as="h2">Welcome to your quiz.</Heading>
                <Heading as="h3">3 questions to master your lessons.</Heading>
            </div>
            <DotLottieReact
                autoplay
                src="/examAnimation.lottie"
                loop
            ></DotLottieReact>
            <Button
                variation="simpleSecondary"
                size="medium"
                onClick={() => dispatch(start())}
            >
                Let&apos;s start
            </Button>
        </div>
    )
}

export default StartScreen
