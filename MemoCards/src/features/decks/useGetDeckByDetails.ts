import { getDeckByDetails as getDeckByDetailsApi } from '@/services/apiDecks'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export function useGetDeckByDetails() {
    const { isLoading: isLoadingDeckDetails, mutate: getDeckByDetails } =
        useMutation({
            mutationFn: getDeckByDetailsApi,
            onError: (err: Error) =>
                toast.error(
                    `${err.message}.Error getting the deck with the current information provided.`
                ),
        })

    return { getDeckByDetails, isLoadingDeckDetails }
}
