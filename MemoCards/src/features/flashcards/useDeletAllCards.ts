import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { deleteAllCards as deleteAllCardsApi } from '@/services/apiCards'
import { type UserType } from '@/ui/ProtectedRoute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteAllCards() {
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )
    const queryClient = useQueryClient()

    const { isLoading: isDeletingAll, mutate: deleteAllCards } = useMutation({
        mutationFn: () => deleteAllCardsApi(user.user_id),
        onSuccess: async () => {
            toast.success('All Cards successfully deleted.')
            await queryClient.invalidateQueries({
                queryKey: ['cards'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeletingAll, deleteAllCards }
}
