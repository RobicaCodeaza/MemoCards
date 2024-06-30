import { Tables } from '@/types/database.types'

type OverallStatsProps = {
    decksTested: Tables<'Decks'>[] | undefined
    quizesTested: Tables<'Quizes'>[] | undefined
}

function OverallStats({ decksTested, quizesTested }: OverallStatsProps) {
    return (
        <div className="col-start-1 col-end-3  flex items-center  justify-center gap-12 overflow-x-scroll rounded-lg border border-mako-grey-150 bg-picton-blue-50 tab-land:col-start-1 tab-land:col-end-2 ">
            <table className=" h-[25rem] w-full  border-collapse tab-land:h-[25rem]">
                <thead>
                    <tr className="bg-chateau-green-400 text-[1.5rem] text-mako-grey-50">
                        <th className=" w-[33.33%] border-r-2 px-6 py-3 text-left">
                            Stats
                        </th>
                        <th className=" w-[33.33%] border-r-2 px-6 py-3 text-left">
                            Decks
                        </th>
                        <th className="w-[33.34%] px-6 py-3 text-left">
                            Quizes
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr className="bg-picton-blue-150">
                        <th className="border-r-2 border-mako-grey-100 px-6 py-3 text-left text-[1.4rem] text-mako-grey-700 ">
                            Total
                        </th>
                        <td className="border-r-2 border-mako-grey-100"></td>
                        <td></td>
                    </tr>
                    <tr className="bg-picton-blue-200">
                        <th className="border-r-2 border-mako-grey-100 px-6 py-3 text-left text-[1.4rem] text-mako-grey-700">
                            Avg Points
                        </th>
                        <td className="border-r-2 border-mako-grey-100"></td>
                        <td></td>
                    </tr>
                    <tr className="bg-picton-blue-150">
                        <th className="border-r-2 border-mako-grey-100 px-6 py-3 text-left text-[1.4rem] text-mako-grey-700">
                            Avg Questions
                        </th>
                        <td className="border-r-2 border-mako-grey-100"></td>
                        <td></td>
                    </tr>
                    <tr className="bg-picton-blue-200">
                        <th className="border-r-2 border-mako-grey-100 px-6 py-3 text-left text-[1.4rem] text-mako-grey-700">
                            Points/Question
                        </th>
                        <td className="border-r-2 border-mako-grey-100"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OverallStats
