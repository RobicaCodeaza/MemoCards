import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { deleteAllDecks as deleteAllDecksApi } from '@/services/apiDecks'
import { UserType } from '@/ui/ProtectedRoute'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteAllDecks() {
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )
    const queryClient = useQueryClient()

    const { isLoading: isDeletingAll, mutate: deleteAllDecks } = useMutation({
        mutationFn: () => deleteAllDecksApi(user.user_id),
        onSuccess: async () => {
            toast.success('All Decks successfully deleted.')
            await queryClient.invalidateQueries({
                queryKey: ['decks'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeletingAll, deleteAllDecks }
}
