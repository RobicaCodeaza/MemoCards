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
type FieldValuesType = {
    question: string
    numberAnswers: number
    answer: string
    correctAnswer: number
}
type CreateCardFormProps = {
    cardToEdit: Tables<'Card'> | undefined
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

    const { register, handleSubmit, formState, reset } =
        useForm<FieldValuesType>({
            defaultValues:
                isEditingSession && cardToEdit
                    ? {
                          question: cardToEdit.question,
                          correctAnswer: cardToEdit.correctAnswer,
                      }
                    : undefined,
        })
    const { errors } = formState
    console.log(deckId)

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        reset()
    }
    const onError: SubmitErrorHandler<FieldError> = () => {
        toast.error(`Error in completing fields.`)
    }

    return (
        <Form variation="regular" onSubmit={handleSubmit(onSubmit, onError)}>
            {/* <DrawerFooter> */}
            <FormRow label="Question" error={errors?.question?.message}>
                <Input
                    type="text"
                    id="question"
                    placeholder="ex: What types of muscles...?"
                    {...register('question', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            {numAnswers > 1 &&
                Array.from({ length: numAnswers }, (_, index) => (
                    <FormRow
                        label={`Answer - ${index + 1}`}
                        error={errors?.answer?.message}
                        key={index}
                    >
                        <Input
                            type="text"
                            id="answer"
                            defaultValue={
                                isEditingSession
                                    ? cardToEdit?.answers?.[index]
                                    : ''
                            }
                            {...register(`answer`, {
                                required: 'This field is required',
                            })}
                        ></Input>
                    </FormRow>
                ))}

            <FormRow
                label={`Correct answer`}
                error={errors?.correctAnswer?.message}
            >
                <Input
                    type="number"
                    id="correctAnswer"
                    {...register('correctAnswer', {
                        required: 'This field is required',
                    })}
                ></Input>
            </FormRow>

            <div className="flex justify-between gap-6">
                <Button type="reset" variation="subtleWhite" size="small">
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
    )
}

export default CreateCardForm
