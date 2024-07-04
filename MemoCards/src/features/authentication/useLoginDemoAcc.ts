import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginDemo } from '@/services/apiAuth'
import toast from 'react-hot-toast'

export function useLoginDemoAcc() {
    const queryClient = useQueryClient()

    const { isLoading: isLoggingInDemo, mutate: loginDemoAcc } = useMutation({
        mutationFn: loginDemo,
        onSuccess: (user) => {
            console.log('user', user)
            queryClient.setQueryData(['user'], user)
            // toast.success("User's data has been updated successfully.")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    return {
        isLoggingInDemo,
        loginDemoAcc,
    }
}
