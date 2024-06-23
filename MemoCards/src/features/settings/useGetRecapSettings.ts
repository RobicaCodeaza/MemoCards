import { useQuery } from '@tanstack/react-query'
import { getRecapSettings as getRecapSettingsApi } from '@/services/apiSettings'
import toast from 'react-hot-toast'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { UserType } from '@/ui/ProtectedRoute'

export function useGetRecapSettings() {
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const {
        data: settings,
        isLoading: isGettingSettings,
        error: errorGettingSettings,
    } = useQuery({
        queryFn: () => getRecapSettingsApi(user.user_id),
        queryKey: ['settings'],
        onError: (err: Error) =>
            toast.error(
                `${err.message}.Error getting the settings for your recap planning.`
            ),
    })

    return {
        settings,
        isGettingSettings,
        errorGettingSettings,
    }
}
