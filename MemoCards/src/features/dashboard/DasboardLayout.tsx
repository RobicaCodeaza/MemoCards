import Spinner from '@/ui/Spinner'
import { useQuizesAll } from '../quiz/useQuizesAll'
import DecksContribution from './DecksContribution'
import OverallStats from './OverallStats'
import RecapPlan from './RecapPlan'
import Empty from '@/ui/Empty'
import { useGetRecapSettings } from '../settings/useGetRecapSettings'
import { useDecks } from '../decks/useDecks'

function DasboardLayout() {
    const { quizes, count, isLoading: isLoadingQuizes } = useQuizesAll()
    const { decks, isLoading: isLoadingDecks } = useDecks()
    const { settingsRecapUser } = useGetRecapSettings()

    if (isLoadingQuizes || isLoadingDecks) return <Spinner></Spinner>
    if (!quizes) return <Empty resource="Quizes"></Empty>

    const quizesTested = quizes?.filter((quiz) => quiz.lastTested !== null)
    const decksTested = decks?.filter((deck) => deck.lastTested !== null)

    return (
        <div className="grid w-full grid-cols-[1fr_1fr] grid-rows-[min-content_auto] gap-20">
            <RecapPlan
                quizesTested={quizesTested}
                settings={settingsRecapUser}
            ></RecapPlan>
            <OverallStats
                decksTested={decksTested}
                quizesTested={quizesTested}
            ></OverallStats>
            <DecksContribution></DecksContribution>
        </div>
    )
}

export default DasboardLayout
