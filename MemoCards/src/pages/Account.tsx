import UpdatePasswordForm from '@/features/authentication/UpdatePasswordForm'
import UpdateUserDataForm from '@/features/authentication/UpdateUserDataForm'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import Heading from '@/ui/Heading'
import { UserType } from '@/ui/ProtectedRoute'
import Row from '@/ui/Row'

function Account() {
    const [user, _] = useLocalStorageState<UserType>(
        { user_id: '', user_provider: '' },
        'user'
    )
    const isNotEmailProvider = user.user_provider !== 'email'

    return (
        <>
            <Heading as="h1">Update your account 🔒</Heading>

            <Row type="vertical">
                <Heading as="h3">Update user data</Heading>
                <UpdateUserDataForm></UpdateUserDataForm>
            </Row>

            <Row type="vertical">
                <Heading as="h3">
                    Update password{' '}
                    {isNotEmailProvider ? '(only for email logins)' : ''}
                </Heading>
                <UpdatePasswordForm></UpdatePasswordForm>
            </Row>
        </>
    )
}

export default Account
