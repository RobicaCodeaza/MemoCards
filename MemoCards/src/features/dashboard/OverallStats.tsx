import { Tables } from '@/types/database.types'

type OverallStatsProps = {
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined
    recentQuizesAndCardsTested:
        | (Tables<'Quizes'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function OverallStats({
    recentDecksAndCardsTested,
    recentQuizesAndCardsTested,
}: OverallStatsProps) {
    //----------------------------------------
    //Stats For Decks
    const totalDecks = recentDecksAndCardsTested?.length
    const averagePointsDecks = recentDecksAndCardsTested
        ?.reduce((acc, el) => {
            return acc + el.perfectionScore!.at(-1)! / totalDecks!
        }, 0)
        .toFixed(2)
    const averageQuestionsDecks = recentDecksAndCardsTested
        ?.reduce((acc, el) => acc + el.cards.length / totalDecks!, 0)
        .toFixed(2)
    const totalPointsDecks = recentDecksAndCardsTested
        ?.reduce((acc, el) => acc + el.perfectionScore!.at(-1)!, 0)
        .toFixed(2)
    const totalCardsDecks = recentDecksAndCardsTested
        ?.reduce((acc, el) => acc + el.cards.length, 0)
        .toFixed(2)
    const totalPointsPerQuestionDecks = (
        Number(totalPointsDecks) / Number(totalCardsDecks)
    ).toFixed(2)

    //----------------------------------------
    //Stats For Quizes
    const totalQuizes = recentQuizesAndCardsTested?.length
    const averagePointsQuizes = recentQuizesAndCardsTested
        ?.reduce((acc, el) => {
            return acc + el.perfectionScore!.at(-1)! / totalQuizes!
        }, 0)
        .toFixed(2)
    const averageQuestionsQuizes = recentQuizesAndCardsTested
        ?.reduce((acc, el) => acc + el.cards.length / totalQuizes!, 0)
        .toFixed(2)
    const totalPointsQuizes = recentQuizesAndCardsTested
        ?.reduce((acc, el) => acc + el.perfectionScore!.at(-1)!, 0)
        .toFixed(2)
    const totalCardsQuizes = recentQuizesAndCardsTested
        ?.reduce((acc, el) => acc + el.cards.length, 0)
        .toFixed(2)
    const totalPointsPerQuestionQuizes = (
        Number(totalPointsQuizes) / Number(totalCardsQuizes)
    ).toFixed(2)

    return (
        <div className="flex-shrink flex-grow  tab-land:w-1/2">
            <table className="h-[25rem] w-full border-collapse   tab-land:h-full ">
                <thead>
                    <tr className="bg-chateau-green-400 text-[1.5rem] text-mako-grey-50">
                        <th className=" w-[33.33%] border-r-2 px-2 py-2 phone:px-4 phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            Stats
                        </th>
                        <th className=" w-[33.33%] border-r-2 px-2 py-2 phone:px-4 phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            Decks
                        </th>
                        <th className="w-[33.34%] px-2 py-2 phone:px-4 phone:py-3  tab-land:px-5 particular-small-laptop:px-6">
                            Quizes
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="bg-picton-blue-150">
                        <th className="border-r-2 border-mako-grey-100   px-2 py-2  text-[1.4rem] text-mako-grey-700 phone:px-4 phone:py-3  tab-land:px-5 particular-small-laptop:px-6">
                            Total
                        </th>
                        <td className="border-r-2 border-mako-grey-100 px-2 py-2 text-center phone:px-4 phone:py-3  tab-land:px-5 particular-small-laptop:px-6">
                            {totalDecks}
                        </td>
                        <td className="px-2 py-2   text-center phone:px-4  phone:py-3  tab-land:px-5 particular-small-laptop:px-6">
                            {totalQuizes}
                        </td>
                    </tr>
                    <tr className="bg-picton-blue-200">
                        <th className="border-r-2 border-mako-grey-100 px-2  py-2  text-center text-[1.4rem] text-mako-grey-700  phone:px-4 phone:py-3  tab-land:px-5 particular-small-laptop:px-6">
                            Avg Points
                        </th>
                        <td className="particular-small-laptop:px-6text-center border-r-2   border-mako-grey-100 px-2 py-2 text-center phone:px-4  phone:py-3 tab-land:px-5">
                            {averagePointsDecks}/100
                        </td>
                        <td className="px-2 py-2 text-center  phone:px-4  phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            {averagePointsQuizes}/100
                        </td>
                    </tr>
                    <tr className="bg-picton-blue-150">
                        <th className="border-r-2 border-mako-grey-100 px-2 py-2 text-center text-[1.4rem] text-mako-grey-700  phone:px-4  phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            Avg Questions/Deck
                        </th>
                        <td className="border-r-2 border-mako-grey-100 px-2 py-2 text-center phone:px-4  phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            {averageQuestionsDecks}
                        </td>
                        <td
                            className="px-6
                            py-3 text-center"
                        >
                            {averageQuestionsQuizes}
                        </td>
                    </tr>
                    <tr className="bg-picton-blue-200">
                        <th className="border-r-2 border-mako-grey-100 px-2 py-2 text-center text-[1.4rem] text-mako-grey-700  phone:px-4 phone:py-3  tab-land:px-5 particular-small-laptop:px-6">
                            Avg Points/Question
                        </th>
                        <td className="border-r-2 border-mako-grey-100   px-2 py-2 text-center phone:px-4  phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            {totalPointsPerQuestionDecks}
                        </td>
                        <td className="px-2 py-2 text-center text-center phone:px-4  phone:py-3 tab-land:px-5 particular-small-laptop:px-6">
                            {totalPointsPerQuestionQuizes}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OverallStats
