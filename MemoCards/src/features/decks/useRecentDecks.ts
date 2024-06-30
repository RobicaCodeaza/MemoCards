import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getRecentDecks } from '@/services/apiDecks'
import { UserType } from '@/ui/ProtectedRoute'
import { useQuery } from '@tanstack/react-query'

export function useRecentDecks() {
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const {
        isLoading,
        data: decks,
        error,
    } = useQuery({
        queryKey: ['decks'],
        queryFn: () => getRecentDecks(user.user_id),
        enabled: !!user.user_id, // Only run the query if user_id exists
    })

    return { isLoading, error, decks }
}
