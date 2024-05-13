import { createEditDeck } from '@/services/apiDecks'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useCreateDeck() {
    const queryClient = useQueryClient()

    const { isLoading: isCreating, mutate: createDeck } = useMutation({
        mutationFn: (deck: Tables<'Decks'>) => createEditDeck(deck, _),
        onSuccess: async () => {
            toast.success('Deck successfully edited.')
            await queryClient.invalidateQueries({
                queryKey: ['decks'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isCreating, createDeck }
}
