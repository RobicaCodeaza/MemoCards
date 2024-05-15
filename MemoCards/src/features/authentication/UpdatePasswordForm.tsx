import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { error } from 'console'
import {
    type SubmitHandler,
    type SubmitErrorHandler,
    useForm,
    type FieldErrors,
} from 'react-hook-form'

type FieldValuesType = {
    passwordCurrent: string
    passwordConfirm: string
}

function UpdatePasswordForm() {
    const { handleSubmit, register, reset, getValues, formState } =
        useForm<FieldValuesType>()

    const { errors } = formState

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        console.log(data)
    }
    const onError: SubmitErrorHandler<FieldErrors> = (error) => {
        console.log(error)
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="regular">
            <FormRow
                label="Password (min 8 characters)"
                error={errors?.passwordCurrent?.message}
            >
                <Input
                    type="password"
                    id="passwordCurrent"
                    autoComplete="current-password"
                    {...register('passwordCurrent', {
                        required: 'This field is required',
                        minLength: {
                            value: 8,
                            message: 'Password needs a minimum of 8 characters',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Confirm password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    {...register('passwordConfirm', {
                        required: 'This field is required',
                        validate: (value) =>
                            getValues().passwordCurrent === value ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow>
                <Button type="reset" variation="subtleWhite" size="small">
                    Cancel
                </Button>
                <Button type="submit" variation="simplePrimary" size="small">
                    Update password
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdatePasswordForm
