import { CarouselItem } from '@/components/ui/carousel'
import useMediaQueryResize, { phone } from '@/hooks/useMediaQuery'
import {
    Area,
    AreaChart,
    CartesianGrid,
    Label,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

type DecksPerfectionEvolutionCardProps = {
    data: {
        deckName: string
        deckEvolution: {
            label: string
            perfectionScore: number
        }[]
    }
}

function DecksPerfectionEvolutionCard({
    data,
}: DecksPerfectionEvolutionCardProps) {
    const mediaPhone = useMediaQueryResize(phone)
    const fontSizeAxis = mediaPhone ? '1.2rem' : '1.4rem'
    const fontSizeLabel = mediaPhone ? '1.4rem' : '1.5rem'
    const fontSizeLegend = mediaPhone ? '1.5rem' : '1.6rem'
    console.log(data)

    return (
        <CarouselItem className=" flex h-[30rem] flex-col gap-6 rounded-lg border border-mako-grey-100 bg-picton-blue-50 px-4 py-4 shadow-md transition-all duration-300 phone:h-[25rem] phone:px-6 phone:py-6 tab-land:h-[40rem] tab-land:px-8 tab-land:py-8">
            <div className="h-full w-full">
                <p className="text-[1.4rem] text-mako-grey-500">
                    Deck Evolution Lesson:{' '}
                    <span className="text-[1.4rem] font-medium uppercase tracking-wide text-picton-blue-700">
                        {data.deckName}
                    </span>
                </p>
                <ResponsiveContainer height={300} width="100%">
                    <AreaChart
                        data={data.deckEvolution}
                        margin={{
                            top: 10,
                            right: 20,
                            bottom: 10,
                            left: 10,
                        }}
                    >
                        {/* <AreaChart data={fakeData} height={300} width={700}> */}
                        <XAxis
                            dataKey="label"
                            tick={{
                                fill: '#45bb6a',
                                fontSize: fontSizeAxis,
                                fontFamily: 'K2D',
                            }}
                            tickLine={{ stroke: '#45bb6a' }}
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
                            unit="p"
                            tick={{
                                fill: '#45bb6a',
                                fontSize: fontSizeAxis,
                                fontFamily: 'K2D',
                            }}
                            tickLine={{ stroke: '#45bb6a' }}
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
                        <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="#cdd0d4"
                            fill="#e8f6fc"
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '4 4' }}
                            itemStyle={{
                                padding: '5px',
                                color: '#e1f2fd',
                            }}
                            wrapperStyle={{
                                padding: '2px',
                                borderRadius: '14px',
                                backgroundColor: '#08679c',
                            }}
                            contentStyle={{
                                borderRadius: '12px',
                                backgroundColor: '#08679c',
                            }}
                        />
                        <Area
                            dataKey="perfectionScore"
                            type="monotone"
                            stroke={'#0881c1'}
                            fill={'#81d1f8'}
                            strokeWidth="2"
                            name="Total Sales"
                            unit="p"
                        ></Area>
                        {/* <Area
                    dataKey="extrasSales"
                    type="monotone"
                    stroke={colors.extrasSales.stroke}
                    fill={colors.extrasSales.fill}
                    strokeWidth="2"
                    name="Extra Sales"
                    unit="$"
                    ></Area> */}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </CarouselItem>
    )
}

export default DecksPerfectionEvolutionCard
