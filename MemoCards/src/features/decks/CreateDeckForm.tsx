import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import {
    type SubmitHandler,
    SubmitErrorHandler,
    useForm,
} from 'react-hook-form'

type FormValues = {
    chapter: string
    subchapter: string
    lesson: string
}

type CreateDeckFormProps = { onCloseModal?: () => void }

function CreateDeckForm({ deckToEdit, onCloseModal }: CreateDeckFormProps) {
    const { handleSubmit, register, reset, getValues, formState } =
        useForm<FormValues>()
    const { errors } = formState
    console.log(errors)
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data)
    }

    const onError: SubmitErrorHandler<FormValues> = () => {
        console.log('error')
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="modal">
            <FormRow label="chapter" error={errors?.chapter?.message}>
                <Input
                    id="chapter"
                    type={'text'}
                    {...register('chapter', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow label="subchapter" error={errors?.subchapter?.message}>
                <Input
                    id="subchapter"
                    type={'text'}
                    {...register('subchapter', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow label="lesson" error={errors?.lesson?.message}>
                <Input
                    id="lesson"
                    type={'text'}
                    {...register('lesson', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow>
                <Button
                    as="button"
                    variation="subtleWhite"
                    size="small"
                    type="reset"
                >
                    Reset
                </Button>
                <Button as="button" variation="simplePrimary" size="small">
                    Edit
                </Button>
            </FormRow>
        </Form>
    )
}

export default CreateDeckForm
