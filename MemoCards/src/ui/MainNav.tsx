import { GoHome } from 'react-icons/go'
import {
    PiCardsThreeLight,
    PiExamLight,
    PiUserCircleGearLight,
    PiBookLight,
} from 'react-icons/pi'

import { CiSettings } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import { useMobileNav } from '@/context/ToggleMobileNav'

function MainNav() {
    const { toggleMobileNav, openMenu } = useMobileNav()

    function handleToggle() {
        if (openMenu) toggleMobileNav()
        else return
    }

    return (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    onClick={handleToggle}
                    to={'dashboard'}
                    className=" justify-left flex items-center gap-5 rounded px-10 py-4 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <GoHome className="text-inherit block h-10 w-10"></GoHome>
                    <span className=" tab-port:block">Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    onClick={handleToggle}
                    to={'decks'}
                    className=" justify-left flex items-center gap-5 rounded px-10 py-4 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <PiBookLight className="text-inherit block h-10 w-10"></PiBookLight>
                    <span className=" tab-port:block">Decks</span>
                </NavLink>
            </li>

            <li>
                <NavLink
                    onClick={handleToggle}
                    to={'flashcards'}
                    className=" justify-left flex items-center gap-5 rounded px-10 py-4 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <PiCardsThreeLight className="text-inherit block h-10 w-10"></PiCardsThreeLight>
                    <span className=" tab-port:block">Cards</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    onClick={handleToggle}
                    to={'quiz'}
                    className=" justify-left flex items-center gap-5 rounded px-10 py-4 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <PiExamLight className="text-inherit block h-10 w-10"></PiExamLight>
                    <span className=" tab-port:block">Quiz</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    onClick={handleToggle}
                    to={'account'}
                    className=" justify-left flex items-center gap-5 rounded px-10 py-4 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <PiUserCircleGearLight className="text-inherit block h-10 w-10"></PiUserCircleGearLight>
                    <span className=" tab-port:block">Account</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    onClick={handleToggle}
                    to={'settings'}
                    className=" justify-left flex items-center gap-5 rounded px-10 py-4 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <CiSettings className="text-inherit block h-10 w-10"></CiSettings>
                    <span className=" tab-port:block">Settings</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default MainNav
