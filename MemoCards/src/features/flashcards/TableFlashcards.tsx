import { Tables } from '@/types/database.types'
import Empty from '@/ui/Empty'
import {
    type PropsWithChildren,
    type ReactNode,
    useContext,
    createContext,
    ReactElement,
} from 'react'
import { motion } from 'framer-motion'

type TableContextType = {
    columns: string
}

const TableContext = createContext<TableContextType | null>(null)

type TableProps = TableContextType & PropsWithChildren

function Table({ columns, children }: TableProps) {
    return (
        <TableContext.Provider value={{ columns }}>
            <div className=" w-full overflow-x-scroll rounded-lg border border-mako-grey-300 bg-picton-blue-50 text-[1.4rem]  tab-land:overflow-hidden">
                {children}
            </div>
        </TableContext.Provider>
    )
}

type HeaderProps = {
    children: ReactNode
}
function Header({ children }: HeaderProps) {
    const { columns } = useContext(TableContext)!
    return (
        <div
            className={`flex flex-col items-center gap-4 border-b border-mako-grey-250 bg-picton-blue-150 px-10 py-7 font-semibold uppercase  tracking-wider text-mako-grey-600 transition-none phone:grid phone:flex-row phone:gap-10`}
            style={{ gridTemplateColumns: columns }}
        >
            {children}
        </div>
    )
}
export type RowProps = {
    children: ReactNode
    index: number
    type: 'question' | 'answer'
}

function Row({ children, index, type }: RowProps) {
    const { columns } = useContext(TableContext)!
    if (type === 'question')
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.2, y: -50 }}
                transition={{ duration: 0.3 }}
                role="row"
                className={`flex w-full flex-col  items-center gap-5  px-10 py-5 text-center transition-none phone:grid phone:gap-10 phone:text-left`}
                style={{
                    gridTemplateColumns: columns,
                    borderTop: index !== 0 ? '1px solid #cdd0d4' : 'none',
                }}
            >
                {children}
            </motion.div>
        )
    else
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.2, y: -50 }}
                transition={{ duration: 0.3 }}
                role="row"
                className={`flex w-full  flex-col 
                   gap-5 bg-picton-blue-90 px-10  py-5  transition-none phone:grid phone:gap-10 phone:text-left
                `}
                style={{
                    gridTemplateColumns: columns,
                    borderTop: '1px solid #e5e7e8',
                }}
            >
                {children}
            </motion.div>
        )
}

type BodyProps = {
    data: Tables<'Card'>[]
    render: (el: Tables<'Card'>, index: number) => ReactElement
}

function Body({ data, render }: BodyProps) {
    if (!data.length) return <Empty resource="cards"></Empty>
    return <div className="mx-0 my-2">{data.map(render)}</div>
}

function Footer({ children }: PropsWithChildren) {
    return (
        <div
            className={`flex justify-center border border-mako-grey-200 p-5 ${children ? '' : 'hidden'}`}
        >
            {children}
        </div>
    )
}
// function  ({ children }) {}

Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.Footer = Footer
export default Table
