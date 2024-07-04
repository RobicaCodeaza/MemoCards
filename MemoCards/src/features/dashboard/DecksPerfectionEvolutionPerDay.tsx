import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import DecksPerfectionEvolutionCard from './DecksPerfectionEvolution/DecksPerfectionEvolutionCard'
export type DecksPerfectionEvolutionProps = {
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function DecksPerfectionEvolutionPerDay({
    recentDecksAndCardsTested,
}: DecksPerfectionEvolutionProps) {
    const decksPerfectionEvolution = recentDecksAndCardsTested?.map((el) => {
        const deckEvolution = el.lastTested!.map((lastTestedDate, index) => {
            return {
                label: new Intl.DateTimeFormat(navigator.language, {
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit',
                }).format(new Date(lastTestedDate)),
                perfectionScore: el.perfectionScore![index],
            }
        })
        // deckEvolution.reverse()

        const arrayWithoutDuplicates = new Map(
            deckEvolution.map((el) => [el.label, el.perfectionScore])
        )
        const deckEvolutionPerDay = Array.from(arrayWithoutDuplicates).map(
            (el) => {
                return { label: el[0], perfectionScore: el[1] }
            }
        )

        return {
            deckName: el.lesson,
            deckEvolution: deckEvolutionPerDay,
        }
    })

    return (
        <div className="flex-shrink flex-grow px-6  phone:px-12  phone:py-2  tab-land:px-6">
            <Carousel className="h-full">
                <CarouselContent className="perspective--big h-full p-2">
                    {decksPerfectionEvolution?.map((data) => (
                        <DecksPerfectionEvolutionCard
                            key={data.deckName}
                            data={data}
                            typeOfEvolution="per day"
                        ></DecksPerfectionEvolutionCard>
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

export default DecksPerfectionEvolutionPerDay
