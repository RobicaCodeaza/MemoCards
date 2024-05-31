import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { deleteAllQuizes as deleteAllQuizesApi } from '@/services/apiQuiz'
import { type UserType } from '@/ui/ProtectedRoute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteAllQuizes() {
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )
    const queryClient = useQueryClient()

    const { isLoading: isDeletingAll, mutate: deleteAllQuizes } = useMutation({
        mutationFn: () => deleteAllQuizesApi(user.user_id),
        onSuccess: async () => {
            toast.success('All Quizes successfully deleted.')
            await queryClient.invalidateQueries({
                queryKey: ['quizes'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeletingAll, deleteAllQuizes }
}
