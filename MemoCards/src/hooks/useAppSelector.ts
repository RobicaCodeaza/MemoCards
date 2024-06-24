import { RootState } from '@/services/store'
import { useSelector } from 'react-redux'

export const useAppSelector = useSelector.withTypes<RootState>()
