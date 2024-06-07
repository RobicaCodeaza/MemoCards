import { AppDispatch } from '@/services/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
