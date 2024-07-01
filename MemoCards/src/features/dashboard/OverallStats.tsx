import { Tables } from '@/types/database.types'

type OverallStatsProps = {
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined

    quizesTested: Tables<'Quizes'>[]
}

function OverallStats({
    recentDecksAndCardsTested,
    quizesTested,
}: OverallStatsProps) {
    console.log(recentDecksAndCardsTested)
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
    const totalPointsPerQuestion = (
        Number(totalPointsDecks) / Number(totalCardsDecks)
    ).toFixed(2)

    console.log(totalPointsDecks, totalCardsDecks)

    return (
        <div className="col-start-1 col-end-3  flex items-center  justify-center gap-12 overflow-x-scroll rounded-lg border border-mako-grey-150 bg-picton-blue-50 tab-land:col-start-1 tab-land:col-end-2 ">
            <table className=" h-[25rem] w-full  border-collapse tab-land:h-[25rem]">
                <thead>
                    <tr className="bg-chateau-green-400 text-[1.5rem] text-mako-grey-50">
                        <th className=" w-[33.33%] border-r-2 px-6 py-3 ">
                            Stats
                        </th>
                        <th className=" w-[33.33%] border-r-2 px-6 py-3">
                            Decks
                        </th>
                        <th className="w-[33.34%] px-6 py-3 ">Quizes</th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="bg-picton-blue-150">
                        <th className="border-r-2 border-mako-grey-100 px-6  py-3  text-[1.4rem] text-mako-grey-700 ">
                            Total
                        </th>
                        <td className="border-r-2 border-mako-grey-100 px-6 py-3 text-center">
                            {totalDecks}
                        </td>
                        <td></td>
                    </tr>
                    <tr className="bg-picton-blue-200">
                        <th className="border-r-2 border-mako-grey-100 px-6  py-3   text-[1.4rem] text-mako-grey-700">
                            Avg Points
                        </th>
                        <td
                            className="border-r-2 border-mako-grey-100    px-6
                            py-3 text-center"
                        >
                            {averagePointsDecks}/100
                        </td>
                        <td></td>
                    </tr>
                    <tr className="bg-picton-blue-150">
                        <th className="border-r-2 border-mako-grey-100 px-6 py-3  text-[1.4rem] text-mako-grey-700">
                            Avg Questions/Deck
                        </th>
                        <td
                            className="border-r-2 border-mako-grey-100 px-6
                            py-3 text-center"
                        >
                            {averageQuestionsDecks}
                        </td>
                        <td></td>
                    </tr>
                    <tr className="bg-picton-blue-200">
                        <th className="border-r-2 border-mako-grey-100 px-6  py-3   text-[1.4rem] text-mako-grey-700">
                            Avg Points/Question
                        </th>
                        <td
                            className="border-r-2 border-mako-grey-100   px-6
                            py-3 text-center"
                        >
                            {totalPointsPerQuestion}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OverallStats
