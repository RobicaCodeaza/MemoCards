import { getDecks } from '@/services/apiDecks'
import { useQuery } from '@tanstack/react-query'

export function useDecks() {
    const {
        isLoading,
        data: decks,
        error,
    } = useQuery({ queryKey: ['decks'], queryFn: getDecks })

    return { isLoading, error, decks }
}
