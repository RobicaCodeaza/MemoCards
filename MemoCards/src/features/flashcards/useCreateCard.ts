import { createEditCard as createEditCardApi } from '@/services/apiCards'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
export function useCreateDeck() {
    const queryClient = useQueryClient()

    const { isLoading: isCreating, mutate: createCard } = useMutation({
        mutationFn: (card: Tables<'Card'>) => createEditCardApi(card, null),
        onSuccess: async () => {
            toast.success('Card successfully created.')
            await queryClient.invalidateQueries({
                queryKey: ['card'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Check if there is any duplicate naming.`
            ),
    })

    return { isCreating, createCard }
}
