import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getDecksPaginated } from '@/services/apiDecks'
import { UserType } from '@/ui/ProtectedRoute'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export function useDecksPaginated() {
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

    return { isLoading, decks, count }
}
