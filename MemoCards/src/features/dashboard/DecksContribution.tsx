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
            const pointsPerQuestionDeck =
                deckOfQuiz && deckOfQuiz.cards
                    ? 100 / deckOfQuiz.cards.length
                    : 0
            const pointsPerQuestionQuiz = 100 / el.cards.length

            if (deckOfQuiz) {
                const pointsDeckInQuiz: number =
                    (deckOfQuiz.perfectionScore!.at(-1)! /
                        pointsPerQuestionDeck) *
                    pointsPerQuestionQuiz

                return {
                    value: pointsDeckInQuiz,
                    name: `Lesson: ${deckOfQuiz.lesson.toUpperCase()}`,
                    color: findColor(deckOfQuiz.perfectionScore!.at(-1)!),
                }
            } else return { value: -1, name: '', color: '' }
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
        console.log(deckContribution)
        decksContribution.push({
            quizName: `${el.quizName}`,
            deckContribution,
        })
    })

    return (
        <div className="flex-shrink  px-6 phone:px-12  phone:py-2   tab-land:w-1/2 tab-land:px-6">
            <Carousel className="h-full">
                <CarouselContent className="perspective--big h-full p-2">
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
