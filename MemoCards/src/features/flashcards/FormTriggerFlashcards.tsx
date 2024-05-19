import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import {
    type FieldError,
    type SubmitErrorHandler,
    useForm,
    type SubmitHandler,
} from 'react-hook-form'
import { Tables } from '@/types/database.types'

import { IoCloseOutline } from 'react-icons/io5'

import FormRow from '../../ui/FormRow.tsx'
import Form from '../../ui/Form.tsx'
import toast from 'react-hot-toast'
import { type PropsWithChildren, useRef } from 'react'
import ButtonIcon from '../../ui/ButtonIcon.tsx'
import Input from '../../ui/Input.tsx'
import Button from '../../ui/Button.tsx'
import Select from '../../ui/Select.tsx'

type Answer = {
    answer: string
}

type FormTypes = {
    question: string
    numberAnswers: number
    answers: Answer[]
    correctAnswer: string
}

function FormTriggerFlashcards({ children }: PropsWithChildren) {
    const { register, handleSubmit, formState } = useForm<FormTypes>()
    const close = useRef(null)

    const { errors } = formState
    const onSubmit: SubmitHandler<FormTypes> = (data) => {
        console.log(data)
    }
    const onError: SubmitErrorHandler<FieldError> = () => {
        toast.error(`Error in completing fields.`)
    }

    return (
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="tab-port:px-30 mx-auto flex flex-col   justify-items-center bg-picton-blue-50   px-10 py-5 phone:w-[90%] phone:px-24  phone:py-16 tab-port:w-[75%] tab-port:py-12 tab-land:w-[60%] tab-land:px-36 tab-land:py-16 particular-small-laptop:w-1/2 particular-small-laptop:px-44 particular-small-laptop:py-20">
                <DrawerClose ref={close} className="absolute  right-6 top-6">
                    <ButtonIcon color={'#626262'}>
                        <IoCloseOutline></IoCloseOutline>
                    </ButtonIcon>
                </DrawerClose>
                <DrawerHeader>
                    <DrawerTitle className="mb-10 ml-auto mr-auto text-[2.4rem] font-medium text-picton-blue-900">
                        Create a new card
                    </DrawerTitle>
                    {/* <DrawerDescription className="text-greyDark text-center text-[14px]  sm:text-[16px] md:text-[18px] ">
                        Fie ca doresti sa vorbim despre serviciile oferite sau
                        pentru alte sugestii, dorim sa-ti auzim opinia.
                    </DrawerDescription> */}
                </DrawerHeader>

                <div className="flex flex-col gap-10">
                    <Form variation="regular">
                        <FormRow
                            label="Email"
                            error={errors?.numberAnswers?.message}
                        >
                            <Input
                                placeholder="a.Correct answer"
                                type="text"
                                id="numberAnswers"
                                {...register('numberAnswers', {
                                    required: 'This field is required',
                                })}
                            />
                        </FormRow>
                    </Form>

                    <Form
                        variation="regular"
                        onSubmit={handleSubmit(onSubmit, onError)}
                    >
                        {/* <DrawerFooter> */}
                        <FormRow
                            label="Question"
                            error={errors?.question?.message}
                        >
                            <Input
                                type="text"
                                id="question"
                                placeholder="ex: What types of muscles...?"
                                {...register('question', {
                                    required: 'This field is required',
                                })}
                            />
                        </FormRow>

                        <FormRow
                            label="Num of answers(optional)"
                            error={errors?.numberAnswers?.message}
                        >
                            <Input
                                placeholder="ex:3"
                                type="number"
                                id="numberAnswers"
                                // {...register('numberAnswers', {
                                //     required: 'This field is required',
                                // })}
                            />
                        </FormRow>

                        <FormRow label="Email" error={errors?.answers?.message}>
                            <Select
                                value="smth"
                                options={[{ value: 'smth', label: 'smth' }]}
                            />
                        </FormRow>

                        <div className="flex justify-between gap-6">
                            <Button
                                type="reset"
                                variation="subtleWhite"
                                size="small"
                            >
                                Cancel
                            </Button>
                            <Button
                                // onClick={(e) => e.preventDefault()}
                                variation="simplePrimary"
                                size="small"
                            >
                                Submit
                            </Button>
                        </div>
                        {/* </DrawerFooter> */}
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default FormTriggerFlashcards
