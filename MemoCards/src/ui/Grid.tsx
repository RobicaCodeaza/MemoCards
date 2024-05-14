import { type ReactNode } from 'react'

type GridProps = {
    children: ReactNode
}

function Grid({ children }: GridProps) {
    return (
        <div className="grid  grid-rows-decks gap-16   phone:grid-cols-decks phone:justify-center">
            {children}
        </div>
    )
}

export default Grid
