import { PropsWithChildren } from 'react'

function Main({ children }: PropsWithChildren) {
    return (
        <main className=" overflow-y-scroll bg-picton-blue-100 px-10 py-10 phone:px-12 phone:py-12 tab-port:px-14 tab-port:py-14 tab-land:px-16 tab-land:py-16 particular-small-laptop:px-24 particular-small-laptop:py-24">
            {children}
        </main>
    )
}

export default Main
