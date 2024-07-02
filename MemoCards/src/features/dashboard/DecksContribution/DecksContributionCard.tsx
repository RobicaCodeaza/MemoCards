import { CarouselItem } from '@/components/ui/carousel'
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

type DeckContributionCardProps = {
    data: {
        quizName: string
        deckContribution: {
            value: number
            name: string
            color: string
        }[]
    }
}

function DecksContributionCard({ data }: DeckContributionCardProps) {
    return (
        <CarouselItem className=" flex h-[30rem]  flex-col gap-6  rounded-lg border border-mako-grey-100 bg-picton-blue-50 px-4 py-4 shadow-md transition-all duration-300 phone:h-[25rem] phone:px-6 phone:py-6 tab-land:h-[22.5rem] tab-land:w-full tab-land:px-8 tab-land:py-8">
            <div className="h-full">
                <p className="text-[1.4rem] text-mako-grey-500">
                    Decks Contribution:{' '}
                    <span className="text-[1.4rem] font-medium uppercase tracking-wide text-picton-blue-700">
                        {data.quizName}
                    </span>
                </p>
                <ResponsiveContainer>
                    <PieChart
                        margin={{
                            top: 100,
                            right: 0,
                            bottom: 5,
                            left: 0,
                        }}
                    >
                        <Pie
                            data={data.deckContribution}
                            nameKey="name"
                            dataKey="value"
                            innerRadius={85}
                            outerRadius={110}
                            startAngle={180}
                            endAngle={0}
                            height={100}
                            cx="50%"
                            cy="50%"
                            paddingAngle={3}
                            label
                        >
                            {data.deckContribution.map((entry) => (
                                <Cell
                                    fill={entry.color}
                                    stroke={entry.color}
                                    key={entry.value}
                                ></Cell>
                            ))}
                        </Pie>
                        <Tooltip></Tooltip>
                        <Legend
                            verticalAlign="bottom"
                            align="left"
                            // width={100}
                            wrapperStyle={{
                                bottom: 15,
                                // width: '100%',
                            }}
                            layout="vertical"
                            iconSize={15}
                            iconType="circle"
                        ></Legend>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </CarouselItem>
    )
}

export default DecksContributionCard
