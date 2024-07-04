import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getQuizesAll } from '@/services/apiQuiz'
import { UserType } from '@/ui/ProtectedRoute'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useQuizesAll() {
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const { isLoading, data: { quizes, count } = {} } = useQuery({
        queryKey: ['quizesAll'],
        queryFn: () => {
            return getQuizesAll(user.user_id)
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isLoading, quizes, count }
}
