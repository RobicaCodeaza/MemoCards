import { createEditCard as createEditCardApi } from '@/services/apiCards'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useEditCard() {
    const queryClient = useQueryClient()

    const { isLoading: isUpdating, mutate: updateCard } = useMutation({
        mutationFn: ({
            newData,
            id,
        }: {
            newData: Tables<'Card'>
            id: number
        }) => createEditCardApi(newData, id),
        onSuccess: async () => {
            toast.success('Card successfully edited.')
            await queryClient.invalidateQueries({
                queryKey: ['cards'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Check if there is any duplicate naming.`
            ),
    })

    return { isUpdating, updateCard }
}
