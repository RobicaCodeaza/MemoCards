import { useUser } from '@/features/authentication/useUser'
import { PropsWithChildren, useEffect } from 'react'
import FullPage from './FullPage'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'

type ProtectedRouteProps = PropsWithChildren

export type UserType = {
    user_id: string
    user_provider: string | undefined
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const [_, setUserId] = useLocalStorageState<UserType>(
        { user_id: '', user_provider: '' },
        'user'
    )
    const { isLoading, isAuthenticated, user } = useUser()
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading)
                navigate('/auth', { replace: true })
            if (isAuthenticated && !isLoading)
                setUserId({
                    user_id: user!.id,
                    user_provider: user!.app_metadata.provider,
                })
        },
        [isAuthenticated, isLoading, navigate, setUserId, user]
    )

    if (isLoading)
        return (
            <FullPage>
                <Spinner></Spinner>
            </FullPage>
        )

    if (isAuthenticated) return <>{children}</>
}

export default ProtectedRoute
