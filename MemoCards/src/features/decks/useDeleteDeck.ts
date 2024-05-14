import { deleteDeck as deleteDeckApi } from '@/services/apiDecks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useDeleteDeck() {
    const queryClient = useQueryClient()

    const { isLoading: isDeleting, mutate: deleteDeck } = useMutation({
        mutationFn: deleteDeckApi,
        onSuccess: async () => {
            toast.success('Deck successfully deleted.')
            await queryClient.invalidateQueries({
                queryKey: ['decks'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeleting, deleteDeck }
}
