import { type ReactNode } from 'react'

type RowProps = {
    children: ReactNode
    type: 'horizontal' | 'vertical'
}

function Row({ children, type }: RowProps) {
    return (
        <div
            className={`flex ${type === 'horizontal' ? 'items-center justify-between' : 'flex-col gap-7'}`}
        >
            {children}
        </div>
    )
}

export default Row
