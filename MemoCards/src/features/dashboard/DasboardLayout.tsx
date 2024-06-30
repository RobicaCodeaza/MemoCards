import Spinner from '@/ui/Spinner'
import DecksContribution from './DecksContribution'
import OverallStats from './OverallStats'
import RecapPlan from './RecapPlan'
import Empty from '@/ui/Empty'
import { useGetRecapSettings } from '../settings/useGetRecapSettings'
import { useRecentDecks } from '../decks/useRecentDecks'
import Button from '@/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useRecentQuizes } from '../quiz/useRecentQuizes'

function DasboardLayout() {
    const navigate = useNavigate()
    const { recentQuizes, isLoading: isLoadingRecentQuizes } = useRecentQuizes()

    const { recentDecksAndCards, isLoading: isLoadingRecentDecks } =
        useRecentDecks()

    const { settingsRecapUser } = useGetRecapSettings()
    const areRecapWeeksDefined =
        settingsRecapUser?.recap_weekstime_p25 &&
        settingsRecapUser?.recap_weekstime_p50 &&
        settingsRecapUser?.recap_weekstime_p75 &&
        settingsRecapUser?.recap_weekstime_p100

    if (isLoadingRecentDecks || isLoadingRecentQuizes)
        return <Spinner></Spinner>

    if (!recentQuizes && (!settingsRecapUser || !areRecapWeeksDefined))
        return (
            <div className="flex w-full items-center justify-center gap-6 text-mako-grey-600">
                <Empty resource="Tested Quizes && Settings"></Empty>
                <Button
                    variation="simpleSecondary"
                    size="small"
                    onClick={() => navigate('/quiz')}
                >
                    Take Quiz
                </Button>
                <Button
                    variation="simpleSecondary"
                    size="small"
                    onClick={() => navigate('/settings')}
                >
                    Set Recap Plan
                </Button>
            </div>
        )

    if (!recentQuizes)
        return (
            <div className="flex w-full items-center justify-center gap-6 text-mako-grey-600">
                <Empty resource="Tested Quizes"></Empty>
                <Button
                    variation="simpleSecondary"
                    size="small"
                    onClick={() => navigate('/quiz')}
                >
                    Take Quiz
                </Button>
            </div>
        )

    if (!settingsRecapUser || !areRecapWeeksDefined)
        return (
            <div className="flex w-full items-center justify-center gap-6 text-mako-grey-600">
                <Empty resource="Settings"></Empty>
                <Button
                    variation="simpleSecondary"
                    size="small"
                    onClick={() => navigate('/settings')}
                >
                    Set Recap Plan
                </Button>
            </div>
        )

    const quizesTested = recentQuizes?.filter(
        (quiz) => quiz.lastTested !== null
    )
    const decksTested = recentDecksAndCards?.filter(
        (deck) => deck.lastTested !== null
    )

    return (
        <div className="grid w-full grid-cols-[1fr_1fr] grid-rows-[min-content_auto] gap-20">
            <RecapPlan quizesTested={quizesTested}></RecapPlan>
            <OverallStats
                decksTested={decksTested}
                quizesTested={quizesTested}
            ></OverallStats>
            <DecksContribution></DecksContribution>
        </div>
    )
}

export default DasboardLayout
