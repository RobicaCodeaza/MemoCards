import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ui/ProtectedRoute'
import AppLayout from './ui/AppLayout'
import Dashboard from './pages/Dashboard'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import Account from './pages/Account'
import Authentication from './pages/Authentication'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import { MobileNavProvider } from './context/ToggleMobileNav'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Decks from './pages/Decks'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
})

function App() {
    return (
        <>
            <MobileNavProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools
                        initialIsOpen={false}
                    ></ReactQueryDevtools>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                element={
                                    <ProtectedRoute>
                                        <AppLayout></AppLayout>
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <Navigate
                                            to="dashboard"
                                            replace
                                        ></Navigate>
                                    }
                                ></Route>
                                <Route
                                    index
                                    path="dashboard"
                                    element={<Dashboard></Dashboard>}
                                ></Route>
                                <Route
                                    path="decks"
                                    element={<Decks></Decks>}
                                ></Route>
                                <Route
                                    path="flashcards"
                                    element={<Flashcards></Flashcards>}
                                ></Route>
                                <Route
                                    path="quiz"
                                    element={<Quiz></Quiz>}
                                ></Route>
                                <Route
                                    path="settings"
                                    element={<Settings></Settings>}
                                ></Route>
                                <Route
                                    path="account"
                                    element={<Account></Account>}
                                ></Route>
                            </Route>
                            <Route
                                path="auth"
                                element={<Authentication></Authentication>}
                            ></Route>
                            <Route
                                path="*"
                                element={<PageNotFound></PageNotFound>}
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                    <Toaster
                        position="top-center"
                        gutter={12}
                        containerStyle={{ margin: '8px' }}
                        toastOptions={{
                            success: { duration: 3000 },
                            error: { duration: 5000 },
                            style: {
                                fontSize: '16px',
                                maxWidth: '500px',
                                padding: '16px 24px',
                                backgroundColor: '#f0f9ff',
                                color: '#0f486b',
                            },
                        }}
                    ></Toaster>
                </QueryClientProvider>
            </MobileNavProvider>
        </>
    )
}

export default App
