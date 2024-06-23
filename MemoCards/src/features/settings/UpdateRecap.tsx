import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { type SubmitHandler, useForm, set } from 'react-hook-form'
import { UserType } from '@/ui/ProtectedRoute'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { useUpdateUser } from './useUpdateUser'
import Spinner from '@/ui/Spinner'
import { useGetRecapSettings } from './useGetRecapSettings'

type FieldValuesType = {
    recap_weekstime_p25: number | null
    recap_weekstime_p50: number | null
    recap_weekstime_p75: number | null
    recap_weekstime_p100: number | null
    future_exam_in_days: number | null
    target_perfection_score: number | null
}

function UpdateRecap() {
    const { settings } = useGetRecapSettings()
    const { isUpdatingUser, updateUser } = useUpdateUser()

    let editValuesDefined
    if (
        settings &&
        'recap_weekstime_p25' in settings &&
        'recap_weekstime_p50' in settings &&
        'recap_weekstime_p75' in settings &&
        'recap_weekstime_p100' in settings &&
        'future_exam_in_days' in settings &&
        'target_perfection_score' in settings
    )
        editValuesDefined = settings

    const [user, _] = useLocalStorageState<UserType>(
        { user_id: '', user_provider: '' },
        'user'
    )
    const isNotEmailProvider = user.user_provider !== 'email'

    const { handleSubmit, register, getValues, formState, reset } =
        useForm<FieldValuesType>({
            defaultValues: editValuesDefined ? editValuesDefined : undefined,
        })
    const { errors } = formState

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        const updateData = { password: data.passwordConfirm }
        updateUser(updateData, {
            onSuccess: () => {
                reset()
            },
        })
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

export default UpdateRecap
