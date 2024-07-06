import Logo from '@/ui/Logo'
import Login from '@/features/authentication/Login'
import Button from '@/ui/Button'
import { useLoginDemoAcc } from '@/features/authentication/useLoginDemoAcc'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function Authentication() {
    const { loginDemoAcc } = useLoginDemoAcc()
    const navigate = useNavigate()
    const ref = useRef<HTMLHeadingElement>(null)
    function loginDemo() {
        loginDemoAcc()
        navigate('/dashboard')
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.style.webkitBackgroundClip = 'text'
            ref.current.style.webkitTextFillColor = 'transparent'
        }
    }, [])

    return (
        <div className="flex min-h-screen flex-col tab-port:flex-row">
            <div className="flex items-center bg-picton-blue-75 px-16 py-12  phone:px-52 tab-port:w-1/2 tab-port:px-20 tab-land:px-44 particular-small-laptop:px-64">
                <div className="w-full rounded-[12px] bg-picton-blue-50 p-6  shadow-lg phone:p-10  tab-port:p-12 tab-land:p-16 particular-small-laptop:p-24">
                    <Logo height="big"></Logo>
                    <p className="mb-10 mt-10 text-center">
                        Take a look at the next flashcards app
                    </p>
                    <Button
                        otherClasses="w-full"
                        variation="accentPrimary"
                        size="large"
                        onClick={() => loginDemo()}
                    >
                        Login With Demo Account
                    </Button>
                    <Login></Login>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-16 bg-login-video-part px-16  py-24 phone:px-52 tab-port:w-1/2 tab-port:px-20 tab-land:px-44 particular-small-laptop:-mt-24 particular-small-laptop:px-64">
                <h1
                    className="text-center text-[3.4rem] font-semibold"
                    ref={ref}
                    style={{
                        background:
                            'linear-gradient(to right, #0881C1 0%, #45BB6A 50%, #FD7812 100%)',
                        // -webkit-background-clip: 'text',
                        // -webkit-text-fill-color: 'transparent',
                    }}
                >
                    An overview of MemoCards
                </h1>
                <div className="aspect-video  w-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/nE2FkVp-fwE"
                        title=""
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Authentication
