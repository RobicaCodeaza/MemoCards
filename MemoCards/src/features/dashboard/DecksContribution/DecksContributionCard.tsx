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
        <CarouselItem className="ml-2 mr-2 flex h-full flex-col  gap-6 rounded-lg border border-chateau-green-300 bg-picton-blue-50 px-12 py-10 shadow-md transition-all duration-300">
            <div className="h-full">
                <p className="text-[1.4rem] text-mako-grey-500">
                    Decks Contribution:{' '}
                    <span className="text-medium text-[1.4rem] uppercase tracking-wide text-picton-blue-700">
                        {data.quizName}
                    </span>
                </p>
                <ResponsiveContainer>
                    <PieChart
                        margin={{
                            top: 100,
                            right: 5,
                            bottom: 10,
                            left: 5,
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
