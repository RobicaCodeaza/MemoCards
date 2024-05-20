import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getDeckIdForCard as getDeckIdForCardApi } from '@/services/apiDecks'
import toast from 'react-hot-toast'

export function useGetDeckIdForCard() {
    const queryClient = useQueryClient()

    const {
        data: deckId,
        isLoading: isGettingDeck,
        mutate: getDeckIdForCard,
        error: errorGettingCard,
    } = useMutation({
        mutationFn: ({
            chapter,
            subChapter,
            lesson,
        }: {
            chapter: string
            subChapter: string
            lesson: string
        }) => getDeckIdForCardApi(chapter, subChapter, lesson),

        onSuccess: async () => {
            toast.success('Existing Deck found.')
            await queryClient.invalidateQueries({
                queryKey: ['decks'],
            })
        },
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Error getting the deck with the current information provided.`
            ),
    })

    return {
        getDeckIdForCard,
        deckId,
        isGettingDeck,
        errorGettingCard,
    }
}
