import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getQuizesSummary } from '@/services/apiQuiz'
import { UserType } from '@/ui/ProtectedRoute'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useQuizesSummary() {
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    //Getting the filter value for chapter

    const { isLoading, data: { dataQuiz, dataExam, count } = {} } = useQuery({
        queryKey: ['quizes'],
        queryFn: () => {
            return getQuizesSummary(user.user_id)
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isLoading, dataQuiz, dataExam, count }
}
