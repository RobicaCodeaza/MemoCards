import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { deleteAllQuizes as deleteAllQuizesApi } from '@/services/apiQuiz'
import { type UserType } from '@/ui/ProtectedRoute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export function useDeleteAllQuizes() {
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )
    const [searchParams, setSearchParams] = useSearchParams()
    const queryClient = useQueryClient()

    const { isLoading: isDeletingAll, mutate: deleteAllQuizes } = useMutation({
        mutationFn: () => deleteAllQuizesApi(user.user_id),
        onSuccess: async () => {
            toast.success('All Quizes successfully deleted.')
            searchParams.delete('page')
            setSearchParams(searchParams)
            await queryClient.invalidateQueries({
                queryKey: ['quizes'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeletingAll, deleteAllQuizes }
}
