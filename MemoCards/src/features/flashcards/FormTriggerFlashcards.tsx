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
import {
    type PropsWithChildren,
    useRef,
    useState,
    cloneElement,
    ReactElement,
} from 'react'
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

type FormTypeFieldsType = { numAnswers: number }

function FormTriggerFlashcards({ children }: PropsWithChildren) {
    const { register, handleSubmit, formState, reset } = useForm<
        FormTypes & FormTypeFieldsType
    >()
    const close = useRef(null)
    const { errors } = formState

    const [numAnswers, setNumAnswers] = useState<number>(0)
    function resetNumAnswers() {
        setNumAnswers(0)
        reset()
    }

    const onSubmitFormType: SubmitHandler<FormTypeFieldsType> = (data) => {
        setNumAnswers(data.numAnswers)
        console.log(data.numAnswers)
    }

    const onSubmitHandler: SubmitHandler<FormTypes> = (data) => {
        console.log(data)
    }
    const onError: SubmitErrorHandler<FieldError> = () => {
        toast.error(`Error in completing fields.`)
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
                    <ButtonIcon color={'#626262'}>
                        <IoCloseOutline></IoCloseOutline>
                    </ButtonIcon>
                </DrawerClose>
                <DrawerHeader>
                    <DrawerTitle className="mb-10 ml-auto mr-auto text-[2.4rem] font-medium text-picton-blue-900">
                        Create a new card
                    </DrawerTitle>
                </DrawerHeader>

                {numAnswers === 0 && (
                    <Form
                        onSubmit={handleSubmit(onSubmitFormType)}
                        variation="modal"
                    >
                        <FormRow
                            label="number of answers"
                            error={errors.numAnswers?.message}
                        >
                            <Input
                                type="number"
                                id="numAnswers"
                                placeholder="ex: 1"
                                {...register('numAnswers', {
                                    required: 'This field is required',
                                })}
                            ></Input>
                        </FormRow>

                        <div className="flex justify-end gap-5">
                            <Button variation="subtleWhite" size="small">
                                Cancel
                            </Button>
                            <Button variation="simplePrimary" size="small">
                                Next
                            </Button>
                        </div>
                    </Form>
                )}
                {numAnswers > 0 && (
                    <Form
                        variation="regular"
                        onSubmit={handleSubmit(onSubmitHandler, onError)}
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

                        {/* <FormRow
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
                        </FormRow> */}

                        {Array.from({ length: numAnswers }, (_, index) => (
                            <FormRow
                                label={`Answer - ${index + 1}`}
                                error={errors?.answers?.message}
                                key={index}
                            >
                                <Input
                                    type="text"
                                    id="answer"
                                    {...register('answer', {
                                        required: 'This field is required',
                                    })}
                                ></Input>
                            </FormRow>
                        ))}

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
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default FormTriggerFlashcards
