import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { UserType } from '@/ui/ProtectedRoute'
import { deleteQuiz as deleteQuizApi } from '@/services/apiQuiz'
import { useSearchParams } from 'react-router-dom'

export function useDeleteQuiz() {
    const queryClient = useQueryClient()

    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )
    const [searchParams, setSearchParams] = useSearchParams()

    const { isLoading: isDeleting, mutate: deleteQuiz } = useMutation({
        mutationFn: (id: number) => deleteQuizApi(id, user.user_id),
        onSuccess: async () => {
            toast.success('Quiz successfully deleted.')
            searchParams.delete('page')
            setSearchParams(searchParams)
            await queryClient.invalidateQueries({
                queryKey: ['quizes'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeleting, deleteQuiz }
}
