import { useMobileNav } from '@/context/ToggleMobileNav'
import Logo from './Logo'
import MainNav from './MainNav'

function Sidebar() {
    const { openMenu } = useMobileNav()

    return (
        <div
            className={`absolute row-span-full flex h-screen w-[20rem]  flex-col gap-[3.2rem] border-r border-mako-grey-100 bg-picton-blue-50 px-6 py-6 transition-[all] duration-300 ease-in-out phone:relative phone:translate-x-0 phone:px-[2.4rem] phone:py-[3.2rem] ${openMenu ? 'z-10 translate-x-0' : 'translate-x-[-100%]'}`}
        >
            <Logo></Logo>
            <MainNav></MainNav>
        </div>
    )
}

export default Sidebar
