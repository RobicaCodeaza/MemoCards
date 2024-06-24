import { type ReactNode } from 'react'

type FullPageProps = { children: ReactNode }

function FullPage({ children }: FullPageProps) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-picton-blue-100">
            {children}
        </div>
    )
}

export default FullPage
