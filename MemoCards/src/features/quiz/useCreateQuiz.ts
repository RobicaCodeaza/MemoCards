import { createEditQuiz as createEditQuizApi } from '@/services/apiQuiz'
import { Tables } from '@/types/database.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
export function useCreateQuiz() {
    const queryClient = useQueryClient()

    const { isLoading: isCreating, mutate: createQuiz } = useMutation({
        mutationFn: (quiz: Tables<'Quizes'>) => createEditQuizApi(quiz, null),
        onSuccess: async () => {
            toast.success('Quiz successfully created.')
            await queryClient.invalidateQueries({
                queryKey: ['quizes'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Check if there is any duplicate naming.`
            ),
    })

    return { isCreating, createQuiz }
}
