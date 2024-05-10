import { type PropsWithChildren } from 'react'

function TableOperations({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center gap-7 tab-land:flex-row">
            {children}
        </div>
    )
}

export default TableOperations
