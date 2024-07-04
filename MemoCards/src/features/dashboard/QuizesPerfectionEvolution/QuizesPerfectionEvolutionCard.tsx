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

type QuizesPerfectionEvolutionCardProps = {
    data: {
        quizName: string
        quizEvolution: {
            label: string
            perfectionScore: number
        }[]
    }
    typeOfEvolution: 'per day' | 'all'
}

function QuizesPerfectionEvolutionCard({
    data,
    typeOfEvolution,
}: QuizesPerfectionEvolutionCardProps) {
    const mediaPhone = useMediaQueryResize(phone)
    const fontSizeAxis = mediaPhone ? '1.2rem' : '1.4rem'
    const fontSizeLabel = mediaPhone ? '1.4rem' : '1.5rem'
    // const fontSizeLegend = mediaPhone ? '1.5rem' : '1.6rem'
    console.log('data', data)
    const marginRightChart = mediaPhone ? 10 : 25
    const marginLeftChart = mediaPhone ? -2 : 5
    const areaColors = {
        stroke: typeOfEvolution === 'per day' ? '#ee5c08' : '#fe902d',
        fill: typeOfEvolution === 'per day' ? '#ffd9a9' : '#ffeed4',
    }

    return (
        <CarouselItem className=" flex h-[37.5rem] flex-col gap-6 rounded-lg border border-mako-grey-100 bg-picton-blue-50 px-4 py-4 shadow-md transition-all duration-300   phone:px-12 phone:py-12">
            <div className="h-full w-full">
                <p className="text-[1.4rem] text-mako-grey-500">
                    Quiz Evolution/
                    <strong className="tracking-wider">
                        {typeOfEvolution}
                    </strong>
                    :{' '}
                    <span className="text-[1.4rem] font-medium uppercase tracking-wide text-picton-blue-700">
                        {data.quizName}
                    </span>
                </p>
                <ResponsiveContainer height="100%" width="100%">
                    <AreaChart
                        data={data.quizEvolution}
                        margin={{
                            top: 25,
                            right: marginRightChart,
                            bottom: 25,
                            left: marginLeftChart,
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
                                fill: '#656d75',
                                fontSize: fontSizeAxis,
                                fontFamily: 'K2D',
                            }}
                            tickLine={{ stroke: '#656d75' }}
                        >
                            <Label
                                value={'Num Questions'}
                                position="insideBottomLeft"
                                offset={10}
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
                                color: '#e1f2fd',
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
                            stroke={areaColors.stroke}
                            fill={areaColors.fill}
                            strokeWidth="2"
                            name="Perfection Score"
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

export default QuizesPerfectionEvolutionCard
