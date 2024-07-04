import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Button from '@/ui/Button'
import QuizesPerfectionEvolutionCard from './QuizesPerfectionEvolution/QuizesPerfectionEvolutionCard'
import { QuizesPerfectionEvolutionProps } from './QuizesPerfectionEvolutionPerDay'

function QuizesPerfectionEvolutionAll({
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

        return {
            quizName: el.quizName,
            quizEvolution: quizEvolution,
        }
    })

    return (
        <div className="flex-shrink flex-grow px-6  phone:px-12  phone:py-2 tab-land:w-1/2 tab-land:px-6">
            <Carousel className="h-full">
                <CarouselContent className="perspective--big h-full p-2">
                    {quizPerfectionEvolution?.map((data) => (
                        <QuizesPerfectionEvolutionCard
                            key={data.quizName}
                            data={data}
                            typeOfEvolution="all"
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

export default QuizesPerfectionEvolutionAll
