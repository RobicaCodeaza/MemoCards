import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRecapSettings as updateRecapSettingsApi } from '@/services/apiSettings'
import toast from 'react-hot-toast'
import { SettingsType } from './UpdateRecap'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { UserType } from '@/ui/ProtectedRoute'

export function useUpdateRecapSettings() {
    const queryClient = useQueryClient()
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )
    const { isLoading: isUpdatingRecapSettings, mutate: updateRecapSettings } =
        useMutation({
            mutationFn: (updates: SettingsType) =>
                updateRecapSettingsApi(updates, user.user_id),
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
