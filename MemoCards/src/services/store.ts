import { configureStore } from '@reduxjs/toolkit'
import quizReducer from '../features/quiz/quizSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({ reducer: { quiz: quizReducer } })
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
