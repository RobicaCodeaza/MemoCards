import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getDecksPaginated } from '@/services/apiDecks'
import { UserType } from '@/ui/ProtectedRoute'
import { PAGE_SIZE_DECKS } from '@/utils/constants'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export function useDecksPaginated() {
    const queryClient = useQueryClient()
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const [searchParams, _] = useSearchParams()

    const pagination = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1

    const { isLoading, data: { decks, count } = {} } = useQuery({
        queryKey: ['decks', pagination],
        queryFn: () => getDecksPaginated(user.user_id, pagination),
        onError: (err: Error) => toast.error(err.message),
    })

    // PRE-FETCHING
    if (!count || count !== null) {
        const pageCount = Math.ceil(count! / PAGE_SIZE_DECKS)
        if (pagination < pageCount)
            void queryClient.prefetchQuery({
                queryKey: ['decks', pagination + 1],
                queryFn: () => {
                    // console.log('pre-fetch')
                    return getDecksPaginated(user.user_id, pagination + 1)
                },
                retry: false,
            })

        if (pagination > 1)
            void queryClient.prefetchQuery({
                queryKey: ['decks', pagination - 1],
                queryFn: () => {
                    // console.log('pre-fetch')
                    return getDecksPaginated(user.user_id, pagination - 1)
                },
                retry: false,
            })
    }

    return { isLoading, decks, count }
}
