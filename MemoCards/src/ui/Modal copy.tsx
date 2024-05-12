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
import Button from './Button'
import { HiXMark } from 'react-icons/hi2'

type ModalContextType = {
    openName: string
    open: Dispatch<SetStateAction<string>>
    close: () => void
}

const ModalContext = createContext<ModalContextType | null>(null)

//2. Create Parent
function Modal({ children }: PropsWithChildren) {
    const [openName, setOpenName] = useState('')
    const close = () => setOpenName('')
    const open = setOpenName
    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    )
}

type OpenProps = {
    children: ReactElement
    opens: string
}

//3.Create child component to help implement
function Open({ children, opens: opensWindowName }: OpenProps) {
    const { open } = useContext(ModalContext)!
    return cloneElement(children, { onClick: () => open(opensWindowName) })
}

type WindowProps = {
    children: ReactNode
    name: string
}

function Window({ children, name }: WindowProps) {
    const { openName, close } = useContext(ModalContext)!

    const ref = useOutsideClick(close, false) as LegacyRef<HTMLDivElement>

    if (name !== openName) return null

    return createPortal(
        <div>
            <div ref={ref}>
                <Button
                    as="button"
                    variation="subtleWhite"
                    size="small"
                    onClick={close}
                >
                    <HiXMark></HiXMark>
                </Button>
                <div>
                    {cloneElement(children as ReactElement, {
                        onCloseModal: close,
                    })}
                </div>
            </div>
        </div>,
        document.body
        // document.querySelector()
    )
}

//4.Create Properties
Modal.Window = Window
Modal.Open = Open

export default Modal
