import { PiPlusThin } from 'react-icons/pi'
import { PiStackPlusThin } from 'react-icons/pi'
import { BiBookAdd } from 'react-icons/bi'
import Button from '@/ui/Button'
import ButtonIcon from '@/ui/ButtonIcon'

function DecksModifiers() {
    return (
        <div className="flex gap-4">
            <Button as="div" variation="subtleWhite" size="small">
                <ButtonIcon otherClasses="w-9 h-9 text-picton-blue-800">
                    <PiPlusThin></PiPlusThin>
                </ButtonIcon>
                New Deck
            </Button>
            <Button as="div" variation="subtleWhite" size="small">
                <ButtonIcon otherClasses="w-9 h-9 text-picton-blue-800">
                    <PiStackPlusThin></PiStackPlusThin>
                </ButtonIcon>
                New Card
            </Button>
        </div>
    )
}

export default DecksModifiers
