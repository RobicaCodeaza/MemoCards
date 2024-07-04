import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import QuizesPerfectionEvolutionCard from './QuizesPerfectionEvolution/QuizesPerfectionEvolutionCard'
export type QuizesPerfectionEvolutionProps = {
    recentQuizesAndCardsTested:
        | (Tables<'Quizes'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function QuizesPerfectionEvolutionPerDay({
    recentQuizesAndCardsTested,
}: QuizesPerfectionEvolutionProps) {
    const quizPerfectionEvolution = recentQuizesAndCardsTested?.map((el) => {
        const quizEvolution = el.lastTested!.map((lastTestedDate, index) => {
            return {
                label: new Intl.DateTimeFormat(navigator.language, {
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit',
                }).format(new Date(lastTestedDate)),
                perfectionScore: el.perfectionScore![index],
            }
        })

        const arrayWithoutDuplicates = new Map(
            quizEvolution.map((el) => [el.label, el.perfectionScore])
        )
        const quizEvolutionPerDay = Array.from(arrayWithoutDuplicates).map(
            (el) => {
                return { label: el[0], perfectionScore: el[1] }
            }
        )

        return {
            quizName: el.quizName,
            quizEvolution: quizEvolutionPerDay,
        }
    })

    return (
        <div className="flex-shrink flex-grow px-6  phone:px-12  phone:py-2 tab-land:w-half-minus-arrows tab-land:px-6">
            <Carousel className="h-full">
                <CarouselContent className="perspective--big h-full p-2">
                    {quizPerfectionEvolution?.map((data) => (
                        <QuizesPerfectionEvolutionCard
                            key={data.quizName}
                            data={data}
                            typeOfEvolution="per day"
                        ></QuizesPerfectionEvolutionCard>
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

export default QuizesPerfectionEvolutionPerDay
