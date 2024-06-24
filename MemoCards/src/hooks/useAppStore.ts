import { AppStore } from '@/services/store'
import { useStore } from 'react-redux'

export const useAppStore = useStore.withTypes<AppStore>()
