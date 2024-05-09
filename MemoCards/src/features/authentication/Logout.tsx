import ButtonIcon from '@/ui/ButtonIcon'

import { IoIosLogOut } from 'react-icons/io'
import { useLogout } from './useLogout'
import SpinnerMini from '@/ui/SpinnerMini'

function Logout() {
    const { isLoading, logout } = useLogout()

    return (
        <ButtonIcon onClick={() => logout()}>
            {isLoading ? (
                <SpinnerMini></SpinnerMini>
            ) : (
                <IoIosLogOut></IoIosLogOut>
            )}
        </ButtonIcon>
    )
}

export default Logout
