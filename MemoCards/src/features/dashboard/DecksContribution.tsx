import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

type DecksContributionProps = {
    recentQuizesAndCardsTested:
        | (Tables<'Quizes'> & { cards: Tables<'Card'>[] })[]
        | undefined
    recentDecksAndCardsTested:
        | (Tables<'Decks'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function findColor(perfectionScore: number) {
    const score =
        perfectionScore <= 25
            ? '25'
            : perfectionScore > 25 && perfectionScore <= 50
              ? '50'
              : perfectionScore > 50 && perfectionScore <= 75
                ? '75'
                : perfectionScore > 75 && perfectionScore <= 100
                  ? '100'
                  : '0'

    // console.log(score)

    const color = {
        0: '#e0222e',
        25: '#e0222ebf',
        50: '#fb6e77bf',
        75: '#98ddad',
        100: '#45bb6abf',
    }
    return color[score]
}

function DecksContribution({
    recentQuizesAndCardsTested,
    recentDecksAndCardsTested,
}: DecksContributionProps) {
    const decksContribution: {
        quizName: string
        deckContribution: {
            value: number
            name: string
            color: string
        }[]
    }[] = []
    recentQuizesAndCardsTested?.map((el) => {
        let deckContribution = el.decksId.map((id) => {
            const deckOfQuiz = recentDecksAndCardsTested?.filter(
                (recent) => recent.id === id
            )?.[0]

            if (deckOfQuiz)
                return {
                    value: deckOfQuiz.perfectionScore!.at(-1)!,
                    name: `Lesson: ${deckOfQuiz.lesson.toUpperCase()}`,
                    color: findColor(deckOfQuiz.perfectionScore!.at(-1)!),
                }
            else return { value: -1, name: '', color: '' }
        })
        deckContribution = deckContribution.filter((el) => el.value !== -1)

        const perfectionScorePerQuiz = deckContribution.reduce(
            (acc, el) => acc + el.value,
            0
        )
        if (perfectionScorePerQuiz > 0)
            deckContribution.push({
                value: 100 - perfectionScorePerQuiz,
                name: 'Incorrect Answers',
                color: '#656d75',
            })

        decksContribution.push({
            quizName: `${el.quizName}`,
            deckContribution,
        })
    })

    return (
        <div className="col-start-1 col-end-2 px-4 py-4 tab-land:col-start-2 tab-land:col-end-3">
            <Carousel className="h-full">
                <div className="h-[20.5rem]">
                    <CarouselContent className="perspective--big h-full  p-2">
                        {decksContribution.map((data) => (
                            <CarouselItem
                                key={Math.random() * 1000}
                                className="ml-2 mr-2 flex h-[20rem] flex-col  gap-6 rounded-lg border border-chateau-green-300 bg-picton-blue-50 px-12 py-10 shadow-md transition-all duration-300"
                            >
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
                                                {data.deckContribution.map(
                                                    (entry) => (
                                                        <Cell
                                                            fill={entry.color}
                                                            stroke={entry.color}
                                                            key={entry.value}
                                                        ></Cell>
                                                    )
                                                )}
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
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-center">
                        <Button as="div" variation="accentPrimary" size="tiny">
                            Next
                        </Button>
                    </CarouselPrevious>
                    <CarouselNext className="text-center" elementType="button">
                        <Button as="div" variation="accentPrimary" size="tiny">
                            Next
                        </Button>
                    </CarouselNext>
                </div>
            </Carousel>
        </div>
    )
}

export default DecksContribution
