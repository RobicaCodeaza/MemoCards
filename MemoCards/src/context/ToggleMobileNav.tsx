import { createContext, useContext, useState, type ReactNode } from 'react'

type ToggleFunction = () => void

type ToggleMobileNavCtx = {
    openMenu: boolean
    toggleMobileNav: ToggleFunction
}

const ToggleMobileNavContext = createContext<ToggleMobileNavCtx | null>(null)

type MobileNavProviderProps = { children: ReactNode }

function MobileNavProvider({ children }: MobileNavProviderProps) {
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    function toggleMobileNav() {
        setOpenMenu((openMenu) => !openMenu)
        console.log(openMenu)
    }
    const ctx: ToggleMobileNavCtx = {
        openMenu,
        toggleMobileNav,
    }

    return (
        <ToggleMobileNavContext.Provider value={ctx}>
            {children}
        </ToggleMobileNavContext.Provider>
    )
}

function useMobileNav() {
    const context = useContext(ToggleMobileNavContext)
    if (context === undefined || context === null)
        throw new Error(
            'ToggleMobileNavContext was used outside of MobileNavProvider'
        )
    return context
}
export { MobileNavProvider, useMobileNav }
