import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import FileInput from '@/ui/FileInput'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUpdateUser } from './useUpdateUser'
import { useUser } from './useUser'
import Spinner from '@/ui/Spinner'
import { User } from '@supabase/supabase-js'

type FieldValuesType = {
    fullName: string
    avatar: FileList
}

type UserMetadata = {
    fullName?: string // fullName is an optional string
    // other properties can be defined here
    avatar: string
}

// Extend the Supabase User type to include your custom metadata
export type ExtendedUser = User & {
    user_metadata: UserMetadata
}

function UpdateUserDataForm() {
    const { handleSubmit, register, formState, reset } =
        useForm<FieldValuesType>()
    const { errors } = formState

    //Retrieving User's Data
    const { user } = useUser()
    const { fullName } = (user && user.user_metadata) ?? {
        fullName: 'Default Name',
    }
    //Retrieving Update User Functionality
    const { isUpdatingUser, updateUser } = useUpdateUser()

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        const updateData = {
            data: {
                fullName: (data.fullName || fullName) ?? 'Default Name',
                avatar: data.avatar[0],
            },
        }
        updateUser(updateData, {
            onSuccess: () => {
                reset()
            },
        })
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
                    placeholder={fullName ?? 'Default Name'}
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
