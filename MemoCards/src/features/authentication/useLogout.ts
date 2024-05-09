import { logout as logoutApi } from '@/services/apiAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { isLoading, mutate: logout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate('/auth', { replace: true })
        },
    })

    return { logout, isLoading }
}
