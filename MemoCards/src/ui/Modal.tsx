import { IoCloseOutline } from 'react-icons/io5'

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
        <div>
            {cloneElement(children as ReactElement, { onClick: handleClick })}
        </div>
    )
}

type WindowProps = {
    children: ReactNode
    name: string
}

function Window({ children, name }: WindowProps) {
    const context = useContext(ModalContext)
    if (context === null)
        throw new Error(
            'Accessed the Modal s context inside a component that does not have access to it.'
        )

    const { openName, close } = context

    const ref = useOutsideClick(close, true) as LegacyRef<HTMLDivElement>

    if (openName !== name) return

    return createPortal(
        <div className="fixed left-0 top-0 h-screen w-full bg-backdrop-color-50  backdrop-blur-sm transition-all duration-500">
            <div
                className="fixed left-1/2 top-1/2 flex translate-x-[-50%] translate-y-[-50%]  flex-col items-center gap-4 rounded-2xl bg-picton-blue-50 px-14 py-14 shadow-lg "
                ref={ref}
            >
                <ButtonIcon
                    positionAlign="end"
                    onClick={close}
                    otherClasses="text-mako-grey-900 w-10 h-10"
                >
                    <IoCloseOutline></IoCloseOutline>
                </ButtonIcon>
                <div>
                    {cloneElement(children as ReactElement, {
                        onCloseModal: close,
                    })}
                </div>
            </div>
        </div>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
