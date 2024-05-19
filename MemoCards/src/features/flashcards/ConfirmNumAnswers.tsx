import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { Dispatch, SetStateAction } from 'react'
import {
    FieldError,
    FieldErrors,
    SubmitErrorHandler,
    useForm,
    type SubmitHandler,
} from 'react-hook-form'
import toast from 'react-hot-toast'

type FieldValuesType = {
    numAnswers: number
}

type ConfirmNumAnswersProps = {
    setNumAnswers: Dispatch<SetStateAction<number>>
}

function ConfirmNumAnswers({ setNumAnswers }: ConfirmNumAnswersProps) {
    const { register, handleSubmit, formState, reset } =
        useForm<FieldValuesType>()
    const { errors } = formState

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        setNumAnswers(data.numAnswers)
        reset()
    }
    const onError: SubmitErrorHandler<FieldError> = () => {
        toast.error('Error in completing fields.')
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="regular">
            <FormRow
                label="number of answers"
                error={errors?.numAnswers?.message}
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
    )
}

export default ConfirmNumAnswers
