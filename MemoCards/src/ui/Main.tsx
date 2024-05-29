import { PropsWithChildren } from 'react'

function Main({ children }: PropsWithChildren) {
    return (
        <main className=" overflow-y-scroll bg-picton-blue-90 px-10 py-6 phone:px-12 phone:py-8 tab-port:px-14 tab-port:py-10 tab-land:px-16 tab-land:py-12 particular-small-laptop:px-24 particular-small-laptop:py-20">
            {children}
        </main>
    )
}

export default Main
