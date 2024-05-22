import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCard as deleteCardApi } from '@/services/apiCards'
import toast from 'react-hot-toast'

export function useDeleteCard() {
    const queryClient = useQueryClient()

    const { isLoading: isDeleting, mutate: deleteCard } = useMutation({
        mutationFn: deleteCardApi,
        onSuccess: async () => {
            toast.success('Card successfully deleted.')
            await queryClient.invalidateQueries({
                queryKey: ['cards'],
            })
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isDeleting, deleteCard }
}
