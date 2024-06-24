import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRecapSettings as updateRecapSettingsApi } from '@/services/apiSettings'
import toast from 'react-hot-toast'
import { SettingsType } from './UpdateRecap'

export function useUpdateRecapSettings() {
    const queryClient = useQueryClient()

    const { isLoading: isUpdatingRecapSettings, mutate: updateRecapSettings } =
        useMutation({
            mutationFn: (updates: SettingsType) =>
                updateRecapSettingsApi(updates),
            onSuccess: (settings) => {
                queryClient.setQueryData(['settings'], settings)
                toast.success("Settings's data has been updated successfully.")
            },
            onError: (error: Error) => {
                toast.error(error.message)
            },
        })

    return {
        isUpdatingRecapSettings,
        updateRecapSettings,
    }
}
