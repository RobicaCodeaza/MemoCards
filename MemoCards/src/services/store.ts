import { configureStore } from '@reduxjs/toolkit'
import quizReducer from '../features/quiz/quizSlice'

export const store = configureStore({ reducer: { quiz: quizReducer } })
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
