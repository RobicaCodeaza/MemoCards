import { PiUserCircleGearLight } from 'react-icons/pi'
import ButtonIcon from './ButtonIcon'
import { useNavigate } from 'react-router-dom'
import Logout from '@/features/authentication/Logout'

function HeaderMenu() {
    const navigate = useNavigate()

    return (
        <ul className="ml-auto mr-2 flex items-center  gap-2">
            <li>
                <ButtonIcon
                    otherClasses="text-picton-blue-700"
                    onClick={() => navigate('/account')}
                >
                    <PiUserCircleGearLight></PiUserCircleGearLight>
                </ButtonIcon>
            </li>
            <li>
                <Logout></Logout>
            </li>
        </ul>
    )
}

export default HeaderMenu
