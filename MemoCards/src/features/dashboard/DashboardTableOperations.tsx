import Filter from '@/ui/Filter'

function DashboardTableOperations() {
    return (
        <div className="flex flex-col items-center gap-2 tab-land:flex-row tab-land:gap-6">
            <Filter
                filteredValue="lastTested"
                options={[
                    { value: 'All', label: 'All' },
                    { value: '7', label: 'Last 7 days' },
                    { value: '14', label: 'Last 14 days' },
                    { value: '30', label: 'Last 30 days' },
                ]}
            ></Filter>
        </div>
    )
}

export default DashboardTableOperations
