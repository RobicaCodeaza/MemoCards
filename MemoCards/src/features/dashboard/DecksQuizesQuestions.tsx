import useMediaQueryResize, { phone } from '@/hooks/useMediaQuery'
import { Tables } from '@/types/database.types'
import {
    CartesianGrid,
    Label,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

type DecksQuizesQuestionsProps = {
    recentQuizesAndCardsTested:
        | (Tables<'Quizes'> & { cards: Tables<'Card'>[] })[]
        | undefined
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function DecksQuizesQuestions({
    recentQuizesAndCardsTested,
    recentDecksAndCardsTested,
}: DecksQuizesQuestionsProps) {
    const mediaPhone = useMediaQueryResize(phone)
    const fontSizeAxis = mediaPhone ? '1.2rem' : '1.4rem'
    const fontSizeLabel = mediaPhone ? '1.4rem' : '1.5rem'
    const fontSizeLegend = mediaPhone ? '1.5rem' : '1.6rem'
    const decksData = recentDecksAndCardsTested?.map((recent) => {
        return { x: recent.perfectionScore.at(-1), y: recent.cards.length }
    })
    const quizesData = recentQuizesAndCardsTested?.map((recent) => {
        return { x: recent.perfectionScore.at(-1), y: recent.cards.length }
    })
    console.log(decksData, quizesData)

    return (
        <div className="flex h-[30.5rem] flex-grow  flex-col gap-6 rounded-lg border border-mako-grey-100 bg-picton-blue-50 p-6 tab-land:basis-1/2 tab-land:p-8">
            <p className="text-[1.4rem] text-mako-grey-500">
                Num Questions in Perfection Score:{' '}
                <span className="text-[1.4rem] font-medium uppercase tracking-wide text-picton-blue-700">
                    Quizes & Decks
                </span>
            </p>
            <ResponsiveContainer width={'100%'} height={'100%'}>
                <ScatterChart
                    margin={{
                        top: 10,
                        right: 20,
                        bottom: 10,
                        left: 0,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="#cdd0d4"
                        fill="#e8f6fc"
                    />
                    <XAxis
                        dataKey="x"
                        type="number"
                        name="Perfection Score"
                        unit="p"
                        tick={{
                            fill: '#45bb6a',
                            fontSize: fontSizeAxis,
                            fontFamily: 'K2D',
                        }}
                        padding={{ left: 0, right: 0 }}
                        minTickGap={2}
                        stroke="#45bb6a"
                    >
                        <Label
                            value={'Perfection Score'}
                            position="insideBottomRight"
                            offset={-10}
                            fontFamily="K2D"
                            fontSize={fontSizeLabel}
                            color="#656d75"
                        />
                    </XAxis>
                    <YAxis
                        dataKey="y"
                        type="number"
                        name="Num Questions"
                        // unit="kg"
                        tick={{
                            fill: '#656d75',
                            fontSize: fontSizeAxis,
                            fontFamily: 'K2D',
                        }}
                        tickSize={5}
                        padding={{ top: 0, bottom: 0 }}
                        minTickGap={5}
                        stroke="#656d75"
                    >
                        <Label
                            value={'Num Questions'}
                            position="insideBottomLeft"
                            offset={30}
                            angle={-90}
                            fontFamily="K2D"
                            fontSize={fontSizeLabel}
                            color="#656d75"
                        />
                    </YAxis>

                    <Tooltip
                        cursor={{ strokeDasharray: '4 4' }}
                        itemStyle={{
                            backgroundColor: '#0881c1',
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            bottom: -5,
                            width: '100%',
                            // padding: 2,
                            fontSize: fontSizeLegend,
                            fontFamily: 'K2D',
                        }}
                        iconSize={10}
                        iconType="circle"
                    />
                    <Scatter
                        name="Decks"
                        data={decksData}
                        fill="#0881c1"
                        shape="square"
                        line
                        // activeShape={10}
                    />
                    <Scatter
                        line
                        name="Quizes"
                        data={quizesData}
                        fill="#fd7812"
                        shape="star"
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DecksQuizesQuestions
