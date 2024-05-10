import { type ReactNode } from 'react'

type GridProps = {
    children: ReactNode
}

function Grid({ children }: GridProps) {
    return (
        <div className="phone:grid-cols-decks phone:grid-rows-decks flex flex-col items-center  gap-14 phone:grid">
            {children}
        </div>
    )
}

export default Grid
