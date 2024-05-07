import { PropsWithChildren } from 'react'

function Main({ children }: PropsWithChildren) {
    return (
        <main className="overflow-y-scroll bg-picton-blue-100 px-4 py-4 tab-port:px-10 tab-port:py-10 tab-land:px-14 tab-land:py-14 particular-small-laptop:px-16 particular-small-laptop:py-16">
            {children}
        </main>
    )
}

export default Main
