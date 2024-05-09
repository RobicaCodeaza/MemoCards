import HeaderMenu from './HeaderMenu'
import ToggleMenu from './ToggleMenu'
import UserAvatar from '../features/authentication/UserAvatar'

function Header() {
    return (
        <div
            className=" flex items-center justify-end gap-[3.2rem] border-b border-mako-grey-100 bg-picton-blue-50 px-5 py-5 sm:relative  tab-land:px-12 tab-land:py-8 
        particular-small-laptop:px-16
        particular-small-laptop:py-10"
        >
            <UserAvatar></UserAvatar>
            <HeaderMenu></HeaderMenu>
            <ToggleMenu></ToggleMenu>
        </div>
    )
}

export default Header
