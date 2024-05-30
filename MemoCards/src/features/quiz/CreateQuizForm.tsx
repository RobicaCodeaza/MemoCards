import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { UserType } from '@/ui/ProtectedRoute'
import React from 'react'
import {
    FieldErrors,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDecks } from '../decks/useDecks'
import Spinner from '@/ui/Spinner'
import { capitalizeHeader } from '@/utils/formatHeaders'

type CreateQuizFormProps = {
    quizToEdit: Tables<'Quizes'> | undefined
    onCloseModal?: () => void
}

function CreateQuizForm({ quizToEdit, onCloseModal }: CreateQuizFormProps) {
    //Defining if we deal with an edit or a create

    const { id: editId, ...editValues } = quizToEdit ?? {}

    const isEditingSession = Boolean(editId)

    //Handling Create || Edit Deck
    // const { isCreating, createDeck } = useCreateDeck()
    // const { isUpdating, updateDeck } = useEditDeck()
    // const isWorking = isCreating ?? isUpdating

    //Getting User_id for the form creation of an object
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    //Handling Form
    const { handleSubmit, register, reset, watch, control, formState } =
        useForm<Tables<'Quizes'>>({
            defaultValues: isEditingSession ? editValues : undefined,
        })
    const { errors } = formState
    const watchQuestionTime = watch('questionTime')
    const watchQuizTime = watch('quizTime')

    const { decks, isLoading } = useDecks()

    const deckCompleteNaming = decks?.map((deck) => {
        return {
            naming: [
                capitalizeHeader(deck.chapter),
                capitalizeHeader(deck.subchapter),
                capitalizeHeader(deck.lesson),
            ].join(', '),
            id: deck.id,
        }
    })

    const onSubmit: SubmitHandler<Tables<'Quizes'>> = (data) => {
        console.log(data)
        // if (isEditingSession)
        //     updateDeck(
        //         { newData: data, id: editId! },
        //         {
        //             onSuccess: () => {
        //                 reset()
        //                 onCloseModal?.()
        //             },
        //         }
        //     )
        // else {
        //     const newData = { ...data, user_id: user.user_id }
        //     createDeck(newData, {
        //         onSuccess: () => {
        //             reset()
        //             onCloseModal?.()
        //         },
        //     })
        // }
    }

    const onError: SubmitErrorHandler<FieldErrors> = () => {
        toast.error('Error in form completion.')
    }

    if (isLoading) return <Spinner></Spinner>

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="modal">
            <FormRow label="Quiz Name" error={errors?.quizName?.message}>
                <Input
                    disabled={false}
                    id="quizName"
                    type="text"
                    placeholder="Quiz num 1"
                    {...register('quizName', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            {!watchQuizTime && (
                <FormRow
                    label="Question Time(optional) - sec"
                    error={errors?.questionTime?.message}
                >
                    <Input
                        disabled={false}
                        id="questionTime"
                        type="number"
                        placeholder="60"
                        {...register('questionTime', {
                            min: {
                                value: 5,
                                message:
                                    'Please provide a pozitive value bigger than 5(sec).',
                            },
                        })}
                    ></Input>
                </FormRow>
            )}
            {!watchQuestionTime && (
                <FormRow
                    label="Quiz Time(optional) - min"
                    error={errors?.quizTime?.message}
                >
                    <Input
                        disabled={false}
                        id="quizTime"
                        placeholder="5"
                        type="number"
                        {...register('quizTime', {
                            min: {
                                value: 1,
                                message:
                                    'Please provide a pozitive value bigger than 1(min).',
                            },
                        })}
                    ></Input>
                </FormRow>
            )}

            <FormRow label="Select Decks" error={errors?.decksId?.message}>
                <span className="text-[1.4rem] text-mako-grey-500">
                    Select Decks from the list below: &darr;
                </span>
            </FormRow>
            <div className="h-[12.5rem] overflow-y-scroll rounded-md border border-mako-grey-400 p-2 phone:h-[15rem] particular-small-laptop:h-[10rem]">
                {deckCompleteNaming?.map((deck, index) => (
                    <FormRow
                        error={errors?.decksId?.[index]?.message}
                        key={index}
                    >
                        <span className="text-center text-[1.3rem] tracking-wide text-picton-blue-900 particular-small-laptop:w-[37.5rem]">
                            {deck.naming}
                        </span>
                        <Input
                            type="checkbox"
                            id={String(deck.id)}
                            value={deck.id}
                            disabled={false}
                            // defaultValue={
                            //     isEditingSession ? cardToEdit?.answers?.[index] : ''
                            // }
                            {...register(`decksId.${index}`, {})}
                        ></Input>
                    </FormRow>
                ))}
            </div>

            <FormRow>
                <Button
                    as="button"
                    variation="subtleWhite"
                    size="small"
                    type="reset"
                    disabled={false}
                >
                    Reset
                </Button>
                <Button
                    as="button"
                    variation="simplePrimary"
                    size="small"
                    disabled={false}
                >
                    {isEditingSession ? 'Edit' : 'Add'}
                </Button>
            </FormRow>
        </Form>
    )
}

export default CreateQuizForm
