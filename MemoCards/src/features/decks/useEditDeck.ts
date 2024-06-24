import { createEditDeck } from '@/services/apiDecks'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useEditDeck() {
    const queryClient = useQueryClient()

    const { isLoading: isUpdating, mutate: updateDeck } = useMutation({
        mutationFn: ({
            newData,
            id,
        }: {
            newData: Tables<'Decks'>
            id: number
        }) => createEditDeck(newData, id),
        onSuccess: async () => {
            toast.success('Deck successfully edited.')
            await queryClient.invalidateQueries({
                queryKey: ['decks'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Check if there is any duplicate naming.`
            ),
    })

    return { isUpdating, updateDeck }
}
