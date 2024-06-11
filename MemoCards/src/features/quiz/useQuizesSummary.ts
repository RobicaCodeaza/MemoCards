import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getQuizesPaginated, getQuizesSummary } from '@/services/apiQuiz'
import { UserType } from '@/ui/ProtectedRoute'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export function useQuizesSummary() {
    const queryClient = useQueryClient()
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    //Getting the filter value for chapter

    const { isLoading, data: { data, count } = {} } = useQuery({
        queryKey: ['quizes'],
        queryFn: () => {
            return getQuizesSummary(user.user_id)
        },
        onError: (err: Error) => toast.error(err.message),
    })

    return { isLoading, data, count }
}
