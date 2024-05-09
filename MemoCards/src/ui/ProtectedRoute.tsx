import { useUser } from '@/features/authentication/useUser'
import { PropsWithChildren, useEffect } from 'react'
import FullPage from './FullPage'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = PropsWithChildren

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate()

    const { isLoading, isAuthenticated } = useUser()

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/auth')
        },
        [isAuthenticated, isLoading, navigate]
    )

    if (isLoading)
        <FullPage>
            <Spinner></Spinner>
        </FullPage>

    if (isAuthenticated) return <>{children}</>
}

export default ProtectedRoute
