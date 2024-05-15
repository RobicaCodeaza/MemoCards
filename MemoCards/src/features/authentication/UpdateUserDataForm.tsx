import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import FileInput from '@/ui/FileInput'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUpdateUser } from './useUpdateUser'
import { useUser } from './useUser'
import Spinner from '@/ui/Spinner'

type FieldValuesType = {
    fullName: string
    avatar: File
}

function UpdateUserDataForm() {
    const { handleSubmit, register, getValues, formState, reset } =
        useForm<FieldValuesType>()
    const { errors } = formState

    const { user } = useUser()

    const { isUpdatingUser, updateUser } = useUpdateUser()

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        const updateData = {
            data: { fullName: data.fullName, avatar: data.avatar },
        }
        updateUser(updateData)
    }

    if (isUpdatingUser) return <Spinner></Spinner>

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit)} variation="regular">
            <FormRow label="Email address">
                <Input id="emailAddress" value={user?.email} disabled />
            </FormRow>

            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    id="fullName"
                    type="text"
                    {...register('fullName', {})}
                />
            </FormRow>

            <FormRow label="Avatar image" error={errors?.avatar?.message}>
                <FileInput id="avatar" {...register('avatar')} />
            </FormRow>

            <FormRow>
                <Button type="reset" size="small" variation="subtleWhite">
                    Cancel
                </Button>
                <Button type="submit" size="small" variation="simplePrimary">
                    Update account
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdateUserDataForm
