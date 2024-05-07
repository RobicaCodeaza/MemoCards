import HeaderMenu from './HeaderMenu'
import ToggleMenu from './ToggleMenu'
import UserAvatar from '../features/authentication/UserAvatar'

function Header() {
    return (
        <div className=" flex  items-center justify-end gap-[3.2rem] border-b border-mako-grey-100 bg-picton-blue-50 p-5 sm:relative ">
            <UserAvatar></UserAvatar>
            <HeaderMenu></HeaderMenu>
            <ToggleMenu></ToggleMenu>
        </div>
    )
}

export default Header
