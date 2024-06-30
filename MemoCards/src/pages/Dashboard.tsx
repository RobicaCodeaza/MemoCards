import DasboardLayout from '@/features/dashboard/DasboardLayout'
import DashboardTableOperations from '@/features/dashboard/DashboardTableOperations'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Dashboard() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Your Stats 📊</Heading>
            </Row>
            <Row type="horizontal">
                {/* <DecksModifiers></DecksModifiers>
                <DecksTableOperations></DecksTableOperations> */}
                <div></div>
                <DashboardTableOperations></DashboardTableOperations>
            </Row>
            <div className="flex flex-col items-center justify-center gap-12">
                <DasboardLayout></DasboardLayout>
            </div>
        </>
    )
}

export default Dashboard
