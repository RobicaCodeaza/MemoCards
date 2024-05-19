import useOutsideClick from '@/hooks/useOutsideClick'
import {
    type PropsWithChildren,
    useState,
    useEffect,
    type SetStateAction,
    type Dispatch,
    useContext,
    type ReactNode,
    type ReactElement,
    LegacyRef,
    ElementType,
    ComponentPropsWithoutRef,
} from 'react'
import { createContext } from 'react'
import { createPortal } from 'react-dom'
import { RiMore2Line } from 'react-icons/ri'

type MenusContextType = {
    openId: number
    open: Dispatch<SetStateAction<number>>
    close: () => void
    position: { x: number; y: number }
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>
}

const MenusContext = createContext<MenusContextType | null>(null)

function Menus({ children }: PropsWithChildren) {
    const [openId, setIsOpenId] = useState<number>(0)
    const [position, setPosition] = useState<{ x: number; y: number }>({})
    const open = setIsOpenId
    function close() {
        setIsOpenId(0)
    }

    useEffect(
        function () {
            function handleScroll() {
                if (openId !== 0) {
                    close()
                    document.removeEventListener('wheel', handleScroll)
                }
            }

            document.addEventListener('wheel', handleScroll)
            return document.removeEventListener('wheel', handleScroll)
        },
        [openId]
    )

    return (
        <MenusContext.Provider
            value={{ openId, open, close, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    )
}

function Menu({ children }: PropsWithChildren) {
    return (
        <div className="flex items-center justify-end phone:justify-center">
            {children}
        </div>
    )
}

type ToggleProps = { id: number }

function Toggle({ id }: ToggleProps) {
    const { openId, open, close, setPosition } = useContext(MenusContext)!

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()

        if (!e) return

        const rect = (e.target as HTMLButtonElement)
            ?.closest('button')
            ?.getBoundingClientRect()

        setPosition({
            x: window.innerWidth - rect!.x - rect!.width,
            y: rect!.y + rect!.height + 8,
        })

        if (openId === 0 || openId !== id) open(id)
        else close()
    }

    return (
        <button
            className="rounded-2xl border-none bg-none p-2 hover:bg-picton-blue-100"
            onClick={handleClick}
        >
            <RiMore2Line className="h-9 w-9 text-picton-blue-900"></RiMore2Line>
        </button>
    )
}

type ListProps = {
    id: number
    children: ReactNode
}

function List({ id, children }: ListProps) {
    const { openId, position, close } = useContext(MenusContext)!
    const ref = useOutsideClick(close, false) as LegacyRef<HTMLUListElement>

    if (openId !== id) return

    return createPortal(
        <ul
            className={`fixed rounded-sm bg-picton-blue-100 shadow-sm`}
            style={{ top: `${position.y}px`, right: `${position.x}px` }}
            ref={ref}
        >
            {children}
        </ul>,
        document.body
    )
}

type ButtonProps<T extends ElementType> = {
    children: ReactNode
    icon: ReactElement
    as?: T
    onClick?: () => void
} & ComponentPropsWithoutRef<T>
function Button<T extends ElementType>({
    children,
    onClick,
    icon,
    as,
    ...otherProps
}: ButtonProps<T>) {
    const { close } = useContext(MenusContext)!

    function handlerButton() {
        if (onClick) onClick()
        close()
    }
    const Component = as ?? 'button'

    return (
        <li>
            <Component
                className="items-left flex w-full items-center gap-2 rounded-md border-none bg-none px-5 py-3 text-[1.4rem] hover:bg-picton-blue-200"
                onClick={handlerButton}
            >
                {icon}
                <span>{children}</span>
            </Component>
        </li>
    )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
