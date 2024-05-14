import { deleteAllDecks as deleteAllDecksApi } from '@/services/apiDecks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteAllDecks() {
    const queryClient = useQueryClient()

    const { isLoading: isDeletingAll, mutate: deleteAllDecks } = useMutation(
        deleteAllDecksApi,
        {
            onSuccess: async () => {
                toast.success('All Decks successfully deleted.')
                await queryClient.invalidateQueries({
                    queryKey: ['decks'],
                })
            },
            onError: (err: Error) => toast.error(err.message),
        }
    )

    return { isDeletingAll, deleteAllDecks }
}
