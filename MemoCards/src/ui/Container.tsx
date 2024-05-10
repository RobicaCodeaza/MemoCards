import { PropsWithChildren } from 'react'

function Container({ children }: PropsWithChildren) {
    return (
        <div className="max-w-screen-xxl mx-auto my-0 flex  h-full flex-col gap-12">
            {children}
        </div>
    )
}

export default Container
