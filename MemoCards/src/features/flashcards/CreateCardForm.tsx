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
type FieldValuesType = {
    question: string
    numberAnswers: number
    answer: string
    correctAnswer: string
}
function CreateCardForm({
    numAnswers,
    deckId,
}: {
    numAnswers: number
    deckId: number
}) {
    const { register, handleSubmit, formState, reset } =
        useForm<FieldValuesType>()
    const { errors } = formState

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

            {Array.from({ length: numAnswers }, (_, index) => (
                <FormRow
                    label={`Answer - ${index + 1}`}
                    error={errors?.answer?.message}
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
