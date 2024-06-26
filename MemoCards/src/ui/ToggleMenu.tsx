import { HiEllipsisVertical } from 'react-icons/hi2'
import Button from './Button'
import { useMobileNav } from '@/context/ToggleMobileNav'

function ToggleMenu() {
    const { toggleMobileNav } = useMobileNav()

    return (
        <Button
            as="button"
            variation="subtleWhite"
            size="tiny"
            otherClasses="block h-16 w-16 p-2 tab-port:hidden text-picton-blue-700"
            onClick={toggleMobileNav}
        >
            <HiEllipsisVertical
                className="h-12 w-12
            "
            ></HiEllipsisVertical>
        </Button>
    )
}

export default ToggleMenu
