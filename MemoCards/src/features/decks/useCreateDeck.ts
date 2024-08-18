import { createEditDeck } from '@/services/apiDecks'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'
import toast from 'react-hot-toast'
export function useCreateDeck() {
    const [api, contextHolder] = notification.useNotification()
    const queryClient = useQueryClient()

    const { isLoading: isCreating, mutate: createDeck } = useMutation({
        mutationFn: (deck: Tables<'Decks'>) => createEditDeck(deck, null),
        onSuccess: async () => {
            // toast.success('Deck successfully created.')
            api.open({
                message: 'Opening Notification',
                description: 'I will never close automatically',
                duration: 0,
            })
            await queryClient.invalidateQueries({
                queryKey: ['decks'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Check if there is any duplicate naming.`
            ),
    })

    return { isCreating, createDeck }
}
