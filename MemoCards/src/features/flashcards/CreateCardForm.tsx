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
type FieldValuesType = {
    question: string
    answers: { value: string }[]
    correctAnswer: number
}
type CreateCardFormProps = {
    cardToEdit: Tables<'Card'>
    numAnswers: number
    deckId: number
}

function CreateCardForm({
    numAnswers,
    deckId,
    cardToEdit,
}: CreateCardFormProps) {
    //Verifying if it is editing session or creating session
    const { id: editId, ...editValues } = cardToEdit ?? {}
    const isEditingSession = Boolean(editId)

    const { isCreating, createCard } = useCreateDeck()
    const { isUpdating, updateCard } = useEditCard()
    const isWorking = isCreating ?? isUpdating

    //Getting User_id for the form creation of an object
    const [user, setUser] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const { register, handleSubmit, formState, reset } = useForm<
        Tables<'Card'>
    >({
        defaultValues: isEditingSession
            ? {
                  question: cardToEdit.question,
                  correctAnswer: cardToEdit.correctAnswer,
                  answers: cardToEdit.answers,
              }
            : undefined,
    })
    const { errors } = formState
    console.log(deckId)

    const onSubmit: SubmitHandler<Tables<'Card'>> = (data) => {
        if (isEditingSession)
            updateCard(
                { newData: data, id: editId },
                {
                    onSuccess: () => {
                        reset()
                    },
                }
            )
        else {
            const newData = { ...data, user_id: user.user_id, deckId }
            createCard(newData, {
                onSuccess: () => {
                    reset()
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
                    error={errors?.correctAnswer?.message}
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
                    // onClick={(e) => e.preventDefault()}
                    variation="simplePrimary"
                    size="small"
                    disabled={isWorking}
                >
                    Submit
                </Button>
            </div>
            {/* </DrawerFooter> */}
        </Form>
    )
}

export default CreateCardForm
