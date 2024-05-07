import { PropsWithChildren } from 'react'

function Container({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto my-0 flex max-w-screen-xl  flex-col gap-8">
            {children}
        </div>
    )
}

export default Container
