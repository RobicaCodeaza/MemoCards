import { IoCloseOutline } from 'react-icons/io5'

import useOutsideClick from '@/hooks/useOutsideClick'
import {
    type Dispatch,
    type SetStateAction,
    useState,
    type ReactNode,
    useContext,
    cloneElement,
    ReactElement,
} from 'react'

import { createContext } from 'react'
import { createPortal } from 'react-dom'

import ButtonIcon from './ButtonIcon'

type ModalContextType = {
    openName: string
    open: Dispatch<SetStateAction<string>>
    close: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

type ModalProps = {
    children: ReactNode
}

function Modal({ children }: ModalProps) {
    const [openName, setOpenName] = useState<string>('')

    const open = setOpenName
    const close = () => {
        setOpenName('')
    }

    return (
        <ModalContext.Provider
            value={{ openName, open, close }}
        ></ModalContext.Provider>
    )
}

type OpenProps = {
    children: ReactNode
    opens: string
}

function Open({ children, opens: opensWinadowName }: OpenProps) {
    const context = useContext(ModalContext)
    if (context === null)
        throw new Error(
            'Accessed the Modal s context inside a component that does not have access to it/'
        )

    const { open, openName } = context

    function handleClick() {
        if (openName !== opensWinadowName) open(opensWinadowName)
    }

    return cloneElement(children as ReactElement, { onClick: handleClick })
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

    const ref = useOutsideClick(close, false)

    if (openName !== name) return

    return createPortal(
        <div>
            <div ref={ref}>
                <ButtonIcon onClick={close} otherClasses="text-picton-blue-900">
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
