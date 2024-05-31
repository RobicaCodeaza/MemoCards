import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { UserType } from '@/ui/ProtectedRoute'
import { deleteQuiz as deleteQuizApi } from '@/services/apiQuiz'

export function useDeleteQuiz() {
    const queryClient = useQueryClient()

    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const { isLoading: isDeleting, mutate: deleteQuiz } = useMutation({
        mutationFn: (id: number) => deleteQuizApi(id, user.user_id),
        onSuccess: async () => {
            toast.success('Quiz successfully deleted.')
            await queryClient.invalidateQueries({
                queryKey: ['quizes'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeleting, deleteQuiz }
}
