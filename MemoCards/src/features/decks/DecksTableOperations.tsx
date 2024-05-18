import Filter from '@/ui/Filter'
import SortBy from '@/ui/SortBy'

function DecksTableOperations() {
    return (
        <div className="flex flex-col items-center gap-6 tab-land:flex-row">
            <Filter
                filteredValue="tested"
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'tested', label: 'Tested' },
                    { value: 'not-tested', label: 'Not Tested' },
                ]}
            ></Filter>
            <SortBy
                options={[
                    { value: 'chapter-asc', label: 'Sort by Chapter(A-Z)' },
                    { value: 'chapter-desc', label: 'Sort by Chapter(Z-A)' },
                    {
                        value: 'subChapter-asc',
                        label: 'Sort by SubChapter(A-Z)',
                    },
                    {
                        value: 'subChapter-desc',
                        label: 'Sort by SubChapter(Z-A)',
                    },

                    {
                        value: 'lesson-asc',
                        label: 'Sort by Lesson(A-Z)',
                    },
                    {
                        value: 'lesson-desc',
                        label: 'Sort by Lesson(Z-A)',
                    },

                    {
                        value: 'perfectionScore-asc',
                        label: 'Sort by Perfection Score(low first)',
                    },
                    {
                        value: 'perfectionScore-desc',
                        label: 'Sort by Perfection Score(high first)',
                    },
                    {
                        value: 'date-oldest',
                        label: 'Sort by date(oldest first)',
                    },
                    {
                        value: 'date-latest',
                        label: 'Sort by date(latest first)',
                    },
                ]}
            ></SortBy>
        </div>
    )
}

export default DecksTableOperations
