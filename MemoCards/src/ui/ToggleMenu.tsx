import { HiEllipsisVertical } from 'react-icons/hi2'
import Button from './Button'
import { useMobileNav } from '@/context/ToggleMobileNav'
import { useEffect } from 'react'

function ToggleMenu() {
    const { toggleMobileNav, openMenu } = useMobileNav()
    useEffect(
        function () {
            console.log(openMenu)
        },
        [openMenu]
    )
    return (
        <Button
            as="button"
            variation="subtleWhite"
            size="tiny"
            otherClasses="ml-auto block h-16 w-16 p-2 phone:hidden"
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
