import Spinner from '@/ui/Spinner'
import DecksContribution from './DecksContribution'
import OverallStats from './OverallStats'
import RecapPlan from './RecapPlan'
import Empty from '@/ui/Empty'
import { useGetRecapSettings } from '../settings/useGetRecapSettings'
import Button from '@/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useRecentQuizes } from '../quiz/useRecentQuizes'
import { useRecentDecksAndCards } from '../decks/useRecentDecksAndCards'

function DasboardLayout() {
    const navigate = useNavigate()
    const { recentQuizes, isLoading: isLoadingRecentQuizes } = useRecentQuizes()

    const { recentDecksAndCards, isLoading: isLoadingRecentDecks } =
        useRecentDecksAndCards()

    const { settingsRecapUser } = useGetRecapSettings()
    const areRecapWeeksDefined =
        settingsRecapUser?.recap_weekstime_p25 &&
        settingsRecapUser?.recap_weekstime_p50 &&
        settingsRecapUser?.recap_weekstime_p75 &&
        settingsRecapUser?.recap_weekstime_p100

    if (isLoadingRecentDecks || isLoadingRecentQuizes)
        return <Spinner></Spinner>

    if (
        (!recentQuizes || recentQuizes.length === 0) &&
        (!settingsRecapUser || !areRecapWeeksDefined)
    )
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

    if (!recentQuizes || recentQuizes.length === 0)
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

    const recentQuizesAndCardsTested = recentQuizes?.filter(
        (quiz) => quiz.lastTested !== null
    )
    const recentDecksAndCardsTested = recentDecksAndCards?.filter(
        (deck) => deck.lastTested !== null
    )

    return (
        <div className="grid w-full grid-cols-[1fr_1fr] grid-rows-[min-content_auto] gap-20">
            <RecapPlan
                recentQuizesAndCardsTested={recentQuizesAndCardsTested}
            ></RecapPlan>
            <OverallStats
                recentDecksAndCardsTested={recentDecksAndCardsTested}
                recentQuizesAndCardsTested={recentQuizesAndCardsTested}
            ></OverallStats>
            <DecksContribution
                recentQuizesAndCardsTested={recentQuizesAndCardsTested}
                recentDecksAndCardsTested={recentDecksAndCardsTested}
            ></DecksContribution>
        </div>
    )
}

export default DasboardLayout
