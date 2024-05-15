import ButtonIcon from '@/ui/ButtonIcon'

import { IoIosLogOut } from 'react-icons/io'
import { useLogout } from './useLogout'
import SpinnerMini from '@/ui/SpinnerMini'

function Logout() {
    const { isLoading, logout } = useLogout()

    return (
        <ButtonIcon
            otherClasses="text-picton-blue-700"
            onClick={() => logout()}
        >
            {isLoading ? (
                <SpinnerMini></SpinnerMini>
            ) : (
                <IoIosLogOut></IoIosLogOut>
            )}
        </ButtonIcon>
    )
}

export default Logout
