import { useMobileNav } from '@/context/ToggleMobileNav'
import Logo from './Logo'
import MainNav from './MainNav'

function Sidebar() {
    const { openMenu } = useMobileNav()

    return (
        <div
            className={`absolute row-span-full flex h-screen w-[20rem] flex-col  gap-[2.5rem] border-r border-mako-grey-100 bg-picton-blue-50 px-6 py-6 transition-[all] duration-300 ease-in-out tab-port:relative tab-port:w-auto tab-port:translate-x-0 tab-port:px-3 tab-port:py-6 ${openMenu ? 'z-10 translate-x-0' : 'translate-x-[-100%]'}`}
        >
            <Logo height="medium"></Logo>
            <MainNav></MainNav>
        </div>
    )
}

export default Sidebar
