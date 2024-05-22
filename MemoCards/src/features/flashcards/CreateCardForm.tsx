import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import {
    type SubmitErrorHandler,
    type SubmitHandler,
    useForm,
    type FieldError,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCreateDeck } from './useCreateCard'
import { useEditCard } from './useEditCard'
import { type UserType } from '@/ui/ProtectedRoute'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { Tables } from '@/types/database.types'
import Spinner from '@/ui/Spinner'
import { type Dispatch, type SetStateAction } from 'react'

type CreateCardFormProps = {
    cardToEdit?: Tables<'Card'>
    numAnswers: number
    deckId: number
    setNumAnswers: Dispatch<SetStateAction<number>>
}

function CreateCardForm({
    setNumAnswers,
    numAnswers,
    deckId,
    cardToEdit,
}: CreateCardFormProps) {
    //Verifying if it is editing session or creating session
    const { id: editId, ...editValues } = cardToEdit ?? {}
    const isEditingSession = Boolean(editId)
    console.log(deckId)

    let editValuesDefined
    if (
        'question' in editValues &&
        'correctAnswer' in editValues &&
        'answers' in editValues
    )
        editValuesDefined = {
            question: cardToEdit?.question,
            correctAnswer: cardToEdit?.correctAnswer,
            answers: cardToEdit?.answers,
        }

    const { isCreating, createCard } = useCreateDeck()
    const { isUpdating, updateCard } = useEditCard()
    const isWorking = isCreating ?? isUpdating

    //Getting User_id for the form creation of an object
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const { register, handleSubmit, formState, reset } = useForm<
        Tables<'Card'>
    >({
        defaultValues: isEditingSession ? editValuesDefined : undefined,
    })
    const { errors } = formState

    const onSubmit: SubmitHandler<Tables<'Card'>> = (data) => {
        if (isEditingSession) {
            const newData = { ...data, deckId }
            updateCard(
                { newData, id: editId! },
                {
                    onSuccess: () => {
                        reset()
                        setNumAnswers(0)
                    },
                }
            )
        } else {
            const newData = { ...data, user_id: user.user_id, deckId }
            createCard(newData, {
                onSuccess: () => {
                    reset()
                    setNumAnswers(0)
                },
            })
        }
    }
    const onError: SubmitErrorHandler<FieldError> = () => {
        toast.error(`Error in completing fields.`)
    }

    if (isWorking) return <Spinner></Spinner>

    return (
        <Form variation="regular" onSubmit={handleSubmit(onSubmit, onError)}>
            {/* <DrawerFooter> */}
            <FormRow label="Question" error={errors?.question?.message}>
                <Input
                    type="text"
                    id="question"
                    disabled={isWorking}
                    placeholder="ex: What types of muscles...?"
                    {...register('question', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            {Array.from({ length: numAnswers }, (_, index) => (
                <FormRow
                    label={`${numAnswers > 1 ? `${index + 1} - ` : ''}  Answer `}
                    error={errors?.answers?.[index]?.message}
                    key={index}
                >
                    <Input
                        type="text"
                        id="answer"
                        disabled={isWorking}
                        defaultValue={
                            isEditingSession ? cardToEdit?.answers?.[index] : ''
                        }
                        {...register(`answers.${index}`, {
                            required: 'This field is required',
                        })}
                    ></Input>
                </FormRow>
            ))}

            {numAnswers > 1 && (
                <FormRow
                    label={`Correct answer`}
                    error={errors.correctAnswer?.message}
                >
                    <Input
                        type="number"
                        id="correctAnswer"
                        placeholder="1"
                        disabled={isWorking}
                        {...register('correctAnswer', {
                            required: 'This field is required',
                        })}
                    ></Input>
                </FormRow>
            )}

            <div className="flex justify-between gap-6">
                <Button
                    type="reset"
                    variation="subtleWhite"
                    size="small"
                    disabled={isWorking}
                >
                    Cancel
                </Button>
                <Button
                    variation="simplePrimary"
                    size="small"
                    disabled={isWorking}
                >
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default CreateCardForm
