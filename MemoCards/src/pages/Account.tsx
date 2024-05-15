import UpdatePasswordForm from '@/features/authentication/UpdatePasswordForm'
import UpdateUserDataForm from '@/features/authentication/UpdateUserDataForm'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Account() {
    return (
        <>
            <Heading as="h1">Update your account</Heading>

            <Row type="vertical">
                <Heading as="h3">Update user data</Heading>
                <UpdateUserDataForm></UpdateUserDataForm>
            </Row>

            <Row type="vertical">
                <Heading as="h3">
                    Update password (only for email logins)
                </Heading>
                <UpdatePasswordForm></UpdatePasswordForm>
            </Row>
        </>
    )
}

export default Account
