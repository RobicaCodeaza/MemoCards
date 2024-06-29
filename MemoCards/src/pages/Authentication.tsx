import Logo from '@/ui/Logo'
import Login from '@/features/authentication/Login'

function Authentication() {
    console.log('auth')

    return (
        <div className="flex min-h-screen items-center justify-center bg-picton-blue-100 py-6">
            <div className="w-[87.5%] rounded-[12px] border-2 border-mako-grey-200 bg-picton-blue-50 p-6 shadow-md phone:w-1/2 phone:p-10 tab-port:w-2/5 tab-port:p-12 tab-land:w-1/3 tab-land:p-16 particular-small-laptop:w-[30%] particular-small-laptop:p-24">
                <Logo height="big"></Logo>
                <p className="mb-10 mt-10 text-center">
                    Take a look at the next flashcards app
                </p>
                <Login></Login>
            </div>
        </div>
    )
}

export default Authentication
