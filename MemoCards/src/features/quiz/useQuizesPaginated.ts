import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getQuizesPaginated } from '@/services/apiQuiz'
import { UserType } from '@/ui/ProtectedRoute'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export function useQuizesPaginated() {
    const queryClient = useQueryClient()
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const [searchParams, _] = useSearchParams()

    //Getting the filter value for chapter

    const pagination = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1

    const { isLoading, data: { quizes, count } = {} } = useQuery({
        queryKey: ['quizes', pagination],
        queryFn: () => {
            console.log('useQuery', pagination)
            return getQuizesPaginated(user.user_id, pagination)
        },
        onError: (err: Error) => toast.error(err.message),
    })

    // PRE-FETCHING
    if (count && count !== null) {
        const pageCount = Math.ceil(count / PAGE_SIZE_QUIZES)
        if (pagination < pageCount)
            void queryClient.prefetchQuery({
                queryKey: ['quizes', pagination + 1],
                queryFn: () => {
                    console.log('pre-fetch forw')
                    return getQuizesPaginated(user.user_id, pagination + 1)
                },
                retry: false,
            })

        if (pagination > 1)
            void queryClient.prefetchQuery({
                queryKey: ['quizes', pagination - 1],
                queryFn: () => {
                    console.log('pre-fetch back')
                    return getQuizesPaginated(user.user_id, pagination - 1)
                },
                retry: false,
            })
    }

    return { isLoading, quizes, count }
}
