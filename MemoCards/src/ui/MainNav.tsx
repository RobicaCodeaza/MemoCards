import { GoHome } from 'react-icons/go'
import { NavLink } from 'react-router-dom'

function MainNav() {
    return (
        <ul className="flex flex-col gap-3">
            <li>
                <NavLink
                    to={'dashboard'}
                    className=" flex items-center gap-5 rounded px-10 py-5 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <GoHome className="h-10 w-10 text-mako-grey-400"></GoHome>
                    <span>Home</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'flashcards'}
                    className=" flex items-center gap-5 rounded px-10 py-5 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <GoHome className="h-10 w-10 text-mako-grey-400"></GoHome>
                    <span>Flashcards</span>
                </NavLink>
            </li>

            <li>
                <NavLink
                    to={'quiz'}
                    className=" flex items-center gap-5 rounded px-10 py-5 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <GoHome className="h-10 w-10 text-mako-grey-400"></GoHome>
                    <span>Quiz</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'account'}
                    className=" flex items-center gap-5 rounded px-10 py-5 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <GoHome className="h-10 w-10 text-mako-grey-400"></GoHome>
                    <span>Account</span>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={'settings'}
                    className=" flex items-center gap-5 rounded px-10 py-5 text-[1.6rem] font-medium text-mako-grey-600 transition-[all] duration-300 ease-in-out hover:bg-picton-blue-100 hover:text-mako-grey-800
                    active:bg-picton-blue-100 active:text-mako-grey-800
                    "
                >
                    <GoHome className="h-10 w-10 text-mako-grey-400"></GoHome>
                    <span>Settings</span>
                </NavLink>
            </li>
        </ul>
    )
}

export default MainNav
