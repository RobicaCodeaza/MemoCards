import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'

import DecksContributionCard from './DecksContribution/DecksContributionCard'

type DecksContributionProps = {
    recentQuizesAndCardsTested:
        | (Tables<'Quizes'> & { cards: Tables<'Card'>[] })[]
        | undefined
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function findColor(perfectionScore: number) {
    const score =
        perfectionScore <= 25
            ? '25'
            : perfectionScore > 25 && perfectionScore <= 50
              ? '50'
              : perfectionScore > 50 && perfectionScore <= 75
                ? '75'
                : perfectionScore > 75 && perfectionScore <= 100
                  ? '100'
                  : '0'

    // console.log(score)

    const color = {
        0: '#e0222e',
        25: '#e0222ebf',
        50: '#fb6e77bf',
        75: '#98ddad',
        100: '#45bb6abf',
    }
    return color[score]
}

function DecksContribution({
    recentQuizesAndCardsTested,
    recentDecksAndCardsTested,
}: DecksContributionProps) {
    const decksContribution: {
        quizName: string
        deckContribution: {
            value: number
            name: string
            color: string
        }[]
    }[] = []
    recentQuizesAndCardsTested?.map((el) => {
        let deckContribution = el.decksId.map((id) => {
            const deckOfQuiz = recentDecksAndCardsTested?.filter(
                (recent) => recent.id === id
            )?.[0]

            if (deckOfQuiz)
                return {
                    value: deckOfQuiz.perfectionScore!.at(-1)!,
                    name: `Lesson: ${deckOfQuiz.lesson.toUpperCase()}`,
                    color: findColor(deckOfQuiz.perfectionScore!.at(-1)!),
                }
            else return { value: -1, name: '', color: '' }
        })
        deckContribution = deckContribution.filter((el) => el.value !== -1)

        const perfectionScorePerQuiz = deckContribution.reduce(
            (acc, el) => acc + el.value,
            0
        )
        if (perfectionScorePerQuiz > 0)
            deckContribution.push({
                value: 100 - perfectionScorePerQuiz,
                name: 'Incorrect Answers',
                color: '#656d75',
            })

        decksContribution.push({
            quizName: `${el.quizName}`,
            deckContribution,
        })
    })

    return (
        <div className="col-start-1 col-end-3  px-10 phone:block phone:px-12  phone:py-2 tab-land:col-start-2 tab-land:col-end-3 tab-land:px-6 ">
            <Carousel className="w-full">
                <CarouselContent className="perspective--big p-2">
                    {decksContribution.map((data) => (
                        <DecksContributionCard
                            key={data.quizName}
                            data={data}
                        ></DecksContributionCard>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-center">
                    <Button as="div" variation="accentPrimary" size="tiny">
                        Next
                    </Button>
                </CarouselPrevious>
                <CarouselNext className="text-center" elementType="button">
                    <Button as="div" variation="accentPrimary" size="tiny">
                        Next
                    </Button>
                </CarouselNext>
            </Carousel>
        </div>
    )
}

export default DecksContribution
