import { IoCloseOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import useOutsideClick from '@/hooks/useOutsideClick'
import {
    type Dispatch,
    type SetStateAction,
    useState,
    type ReactNode,
    useContext,
    cloneElement,
    type ReactElement,
    type LegacyRef,
    type PropsWithChildren,
    createContext,
} from 'react'

import { createPortal } from 'react-dom'

import ButtonIcon from './ButtonIcon'

type ModalContextType = {
    openName: string
    open: Dispatch<SetStateAction<string>>
    close: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

function Modal({ children }: PropsWithChildren) {
    const [openName, setOpenName] = useState<string>('')

    const open = setOpenName
    const close = () => {
        setOpenName('')
    }

    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    )
}

type OpenProps = {
    opens: string
    children: ReactNode
}

function Open({ children, opens: opensWinadowName }: OpenProps) {
    const context = useContext(ModalContext)
    if (context === null)
        throw new Error(
            'Accessed the Modal s context inside a component that does not have access to it.'
        )

    const { open } = context

    function handleClick() {
        open(opensWinadowName)
    }

    return (
        <>{cloneElement(children as ReactElement, { onClick: handleClick })}</>
    )
}

type WindowProps = {
    children: ReactNode
    name: string
    windowTitle?: string
    type?: 'regular' | 'quiz'
}

function Window({
    children,
    name,
    windowTitle,
    type = 'regular',
}: WindowProps) {
    const context = useContext(ModalContext)
    if (context === null)
        throw new Error(
            'Accessed the Modal s context inside a component that does not have access to it.'
        )

    const { openName, close } = context

    const ref = useOutsideClick(close, true) as LegacyRef<HTMLDivElement>

    if (openName !== name) return

    return createPortal(
        <motion.div
            className={`fixed left-0 top-0 h-screen w-full ${type === 'regular' ? 'bg-backdrop-color-50' : 'bg-chateau-green-100 bg-opacity-30'}  backdrop-blur-sm`}
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className={`tab-land:px-18 tab-land:py-18 fixed left-1/2 top-1/2 flex  translate-x-[-50%] translate-y-[-50%]  flex-col gap-4 rounded-2xl bg-picton-blue-50  px-4 py-4 shadow-lg phone:px-8 phone:py-8 tab-port:px-12 tab-port:py-12 ${type === 'regular' ? '' : 'bg-gradient-to-tl from-picton-blue-50 to-chateau-green-300'}`}
                initial={{ scale: 0.8, opacity: 0, y: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 250 }}
                ref={ref}
            >
                <div className="flex items-center justify-between">
                    <p className="ml-auto mr-auto text-[1.8rem] font-medium text-picton-blue-900">
                        {windowTitle}
                    </p>
                    <ButtonIcon
                        positionAlign="end"
                        onClick={close}
                        otherClasses="text-mako-grey-900 w-10 h-10"
                    >
                        <IoCloseOutline></IoCloseOutline>
                    </ButtonIcon>
                </div>
                <div>
                    {cloneElement(children as ReactElement, {
                        onCloseModal: close,
                    })}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
