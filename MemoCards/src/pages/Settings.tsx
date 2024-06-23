import UpdateRecap from '@/features/settings/UpdateRecap'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Settings() {
    return (
        <>
            <Heading as="h1">Manage your priorities ⚙️</Heading>

            <Row type="vertical">
                <Heading as="h3">Update Recap Plan</Heading>
                <UpdateRecap></UpdateRecap>
            </Row>

            <Row type="vertical">
                <Heading as="h3">Update password </Heading>
            </Row>
        </>
    )
}

export default Settings
