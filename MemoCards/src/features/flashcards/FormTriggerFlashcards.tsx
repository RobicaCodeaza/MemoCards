import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'

import { IoCloseOutline } from 'react-icons/io5'
import {
    type PropsWithChildren,
    useRef,
    useState,
    cloneElement,
    type ReactElement,
} from 'react'
import ButtonIcon from '../../ui/ButtonIcon.tsx'
import CreateCardForm from './CreateCardForm.tsx'
import ConfirmFormType from './ConfirmFormType.tsx'

function FormTriggerFlashcards({ children }: PropsWithChildren) {
    const close = useRef(null)

    const [numAnswers, setNumAnswers] = useState<number>(0)
    function resetNumAnswers() {
        console.log('trigger ')
        setNumAnswers(0)
    }
    return (
        <Drawer>
            <DrawerTrigger>
                {cloneElement(children as ReactElement, {
                    handleClick: resetNumAnswers,
                })}
            </DrawerTrigger>
            <DrawerContent className="tab-port:px-30 mx-auto flex flex-col   justify-items-center bg-picton-blue-50   px-10 py-5  phone:px-24  phone:py-16 tab-port:py-12  tab-land:px-36 tab-land:py-16 particular-small-laptop:w-2/3 particular-small-laptop:px-44 particular-small-laptop:py-20">
                <DrawerClose ref={close} className="absolute  right-6 top-6">
                    <ButtonIcon as="div">
                        <IoCloseOutline></IoCloseOutline>
                    </ButtonIcon>
                </DrawerClose>
                <DrawerHeader>
                    <DrawerTitle className="mb-10 ml-auto mr-auto text-[2.4rem] font-medium text-picton-blue-900">
                        Create a new card
                    </DrawerTitle>
                </DrawerHeader>
                {numAnswers === 0 && (
                    <ConfirmFormType
                        setNumAnswers={setNumAnswers}
                    ></ConfirmFormType>
                )}

                {numAnswers > 0 && (
                    <CreateCardForm numAnswers={numAnswers}></CreateCardForm>
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default FormTriggerFlashcards
