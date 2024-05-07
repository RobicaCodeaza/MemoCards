import { PropsWithChildren } from 'react'

function Main({ children }: PropsWithChildren) {
    return (
        <main className="overflow-y-scroll bg-picton-blue-100 pb-16 pl-12 pr-12 pt-12">
            {children}
        </main>
    )
}

export default Main
