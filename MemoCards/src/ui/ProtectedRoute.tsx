import { PropsWithChildren } from 'react'

type ProtectedRouteProps = PropsWithChildren

function ProtectedRoute({ children }: ProtectedRouteProps) {
    return <>{children}</>
}

export default ProtectedRoute
