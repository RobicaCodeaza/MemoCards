import SortBy from '@/ui/SortBy'

function QuizTableOperation() {
    return (
        <div className="flex flex-col items-center gap-2 tab-land:flex-row tab-land:gap-6">
            <SortBy
                options={[
                    { value: 'name-asc', label: 'Sort by Name(A-Z)' },
                    { value: 'name-desc', label: 'Sort by Name(Z-A)' },

                    {
                        value: 'perfectionScore-asc',
                        label: 'Sort by Perfection Score(low first)',
                    },
                    {
                        value: 'perfectionScore-desc',
                        label: 'Sort by Perfection Score(high first)',
                    },
                    {
                        value: 'lastTested-oldest',
                        label: 'Sort by date(oldest first)',
                    },
                    {
                        value: 'lastTested-latest',
                        label: 'Sort by date(latest first)',
                    },
                ]}
            ></SortBy>
        </div>
    )
}

export default QuizTableOperation
