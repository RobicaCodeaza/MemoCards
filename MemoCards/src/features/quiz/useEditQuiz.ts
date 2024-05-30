import { createEditQuiz as createEditQuizApi } from '@/services/apiQuiz'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useEditQuiz() {
    const queryClient = useQueryClient()

    const { isLoading: isUpdating, mutate: updateQuiz } = useMutation({
        mutationFn: ({
            newData,
            id,
        }: {
            newData: Tables<'Quizes'>
            id: number
        }) => createEditQuizApi(newData, id),
        onSuccess: async () => {
            toast.success('Quiz successfully edited.')
            await queryClient.invalidateQueries({
                queryKey: ['quizes'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Check if there is any duplicate naming.`
            ),
    })

    return { isUpdating, updateQuiz }
}
