import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { UserType } from '@/ui/ProtectedRoute'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { useUpdateUser } from './useUpdateUser'
import Spinner from '@/ui/Spinner'

type FieldValuesType = {
    passwordCurrent: string
    passwordConfirm: string
}

function UpdatePasswordForm() {
    const [user, _] = useLocalStorageState<UserType>(
        { user_id: '', user_provider: '' },
        'user'
    )
    const isNotEmailProvider = user.user_provider !== 'email'

    const { handleSubmit, register, getValues, formState } =
        useForm<FieldValuesType>()
    const { errors } = formState

    const { isUpdatingUser, updateUser } = useUpdateUser()

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        const updateData = { password: data.passwordConfirm }
        updateUser(updateData)
    }
    // const onError: SubmitErrorHandler<FieldErrors> = (error) => {
    //     console.log(error)
    // }

    if (isUpdatingUser) return <Spinner></Spinner>

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit)} variation="regular">
            <FormRow
                label="Password (min 8 characters)"
                error={errors?.passwordCurrent?.message}
            >
                <Input
                    type="password"
                    id="passwordCurrent"
                    disabled={isNotEmailProvider}
                    autoComplete="current-password"
                    {...register('passwordCurrent', {
                        required: 'This field is required',
                        minLength: {
                            value: 8,
                            message: 'Password needs a min of 8 characters',
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
                    disabled={isNotEmailProvider}
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
                <Button
                    type="reset"
                    variation="subtleWhite"
                    disabled={isNotEmailProvider}
                    size="small"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variation="simplePrimary"
                    disabled={isNotEmailProvider}
                    size="small"
                >
                    Update password
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdatePasswordForm
