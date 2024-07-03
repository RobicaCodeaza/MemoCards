import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import DecksPerfectionEvolutionCard from './DecksPerfectionEvolutionCard'
type DecksPerfectionEvolutionProps = {
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function DecksPerfectionEvolution({
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

        return {
            deckName: el.lesson,
            deckEvolution,
        }
    })

    return (
        <div className="flex-shrink flex-grow px-10 phone:px-12  phone:py-2  tab-land:basis-1/2 tab-land:px-6">
            <Carousel className="h-full">
                <CarouselContent className="perspective--big h-full p-2">
                    {decksPerfectionEvolution?.map((data) => (
                        <DecksPerfectionEvolutionCard
                            key={data.deckName}
                            data={data}
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

export default DecksPerfectionEvolution
