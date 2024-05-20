import { getCards } from '@/services/apiCards'
import { useQuery } from '@tanstack/react-query'

export function useCards() {
    const { isLoading, data: cards } = useQuery({
        queryKey: ['cards'],
        queryFn: () => getCards(),
    })

    return { isLoading, cards }
}
