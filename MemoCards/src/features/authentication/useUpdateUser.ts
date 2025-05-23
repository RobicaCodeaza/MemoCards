import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser as updateUserApi } from '@/services/apiAuth'
import toast from 'react-hot-toast'

export function useUpdateUser() {
    const queryClient = useQueryClient()

    const { isLoading: isUpdatingUser, mutate: updateUser } = useMutation({
        mutationFn: updateUserApi,
        onSuccess: (user) => {
            // console.log(user)
            queryClient.setQueryData(['user'], user)
            toast.success("User's data has been updated successfully.")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    return {
        isUpdatingUser,
        updateUser,
    }
}
