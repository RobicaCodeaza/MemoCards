import { PropsWithChildren } from 'react'

function Main({ children }: PropsWithChildren) {
    return (
        <main className="overflow-y-scroll bg-picton-blue-100 px-4 py-4 tab-port:px-10 tab-port:py-10 tab-land:px-16 tab-land:py-16 particular-small-laptop:px-24 particular-small-laptop:py-24">
            {children}
        </main>
    )
}

export default Main
