import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getRecentQuizes } from '@/services/apiQuiz'
import { UserType } from '@/ui/ProtectedRoute'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'

export function useRecentQuizes() {
    const [searchParams] = useSearchParams()
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const numDays = searchParams.get('lastTested')
        ? Number(searchParams.get('lastTested'))
        : 'All'

    let date: string | null
    if (numDays === 'All') date = null
    if (numDays === 7 || numDays === 14 || numDays === 30) {
        date = subDays(new Date(), numDays).toDateString()
        // console.log(date)
    }

    const {
        isLoading,
        data: recentQuizes,
        error,
    } = useQuery({
        queryKey: ['quizes', `last-${numDays}`],
        queryFn: () => getRecentQuizes(user.user_id, date),
        enabled: !!user.user_id, // Only run the query if user_id exists
    })

    return { isLoading, error, recentQuizes }
}
