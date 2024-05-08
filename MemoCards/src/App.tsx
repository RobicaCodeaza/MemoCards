import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ui/ProtectedRoute'
import AppLayout from './ui/AppLayout'
import Dashboard from './pages/Dashboard'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import Account from './pages/Account'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import { MobileNavProvider } from './context/ToggleMobileNav'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
                                    path="dashboard"
                                    element={<Dashboard></Dashboard>}
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
                                path="login"
                                element={<Login></Login>}
                            ></Route>
                            <Route
                                path="signup"
                                element={<SignUp></SignUp>}
                            ></Route>
                            <Route
                                path="*"
                                element={<PageNotFound></PageNotFound>}
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </MobileNavProvider>
        </>
    )
}

export default App
