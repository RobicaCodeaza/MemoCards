import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { type SubmitHandler, useForm, set } from 'react-hook-form'
import { UserType } from '@/ui/ProtectedRoute'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
// import { useUpdateUser } from './useUpdateUser'
// import Spinner from '@/ui/Spinner'
import { useGetRecapSettings } from './useGetRecapSettings'
import Spinner from '@/ui/Spinner'

type FieldValuesType = {
    recap_weekstime_p25: number | null
    recap_weekstime_p50: number | null
    recap_weekstime_p75: number | null
    recap_weekstime_p100: number | null
    future_exam_in_days: number | null
    target_perfection_score: number | null
}

function UpdateRecap() {
    const { settingsRecapUser, isGettingSettings } = useGetRecapSettings()
    // const { isUpdatingUser, updateUser } = useUpdateUser()

    const [user, _] = useLocalStorageState<UserType>(
        { user_id: '', user_provider: '' },
        'user'
    )
    const isNotEmailProvider = user.user_provider !== 'email'

    const { handleSubmit, register, getValues, formState } =
        useForm<FieldValuesType>()
    const { errors } = formState

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        console.log(data)
        // const updateData = { password: data.passwordConfirm }
        // updateUser(updateData, {
        //     onSuccess: () => {
        //         reset()
        //     },
        // })
    }
    // const onError: SubmitErrorHandler<FieldErrors> = (error) => {
    //     console.log(error)
    // }

    // if (isUpdatingUser) return <Spinner></Spinner>

    if (isGettingSettings) return <Spinner></Spinner>
    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit)} variation="regular">
            <FormRow
                label="Recap Weeks (Score <= 25)"
                error={errors?.recap_weekstime_p25?.message}
            >
                <Input
                    type="number"
                    id="recap_weekstime_p25"
                    placeholder={
                        settingsRecapUser?.recap_weekstime_p25
                            ? String(settingsRecapUser?.recap_weekstime_p25)
                            : 'Enter a recap time for tests with score <= 25'
                    }
                    {...register('recap_weekstime_p25', {
                        required: 'This field is required',
                        validate: (value) =>
                            (getValues().recap_weekstime_p25 !== null &&
                                getValues().recap_weekstime_p25! >= 0 &&
                                getValues().recap_weekstime_p25! <= 100) ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow
                label="Recap Weeks (Score <= 50)"
                error={errors?.recap_weekstime_p50?.message}
            >
                <Input
                    type="number"
                    id="recap_weekstime_p50"
                    placeholder={
                        settingsRecapUser?.recap_weekstime_p50
                            ? String(settingsRecapUser?.recap_weekstime_p50)
                            : 'Enter a recap time for tests with score <= 50'
                    }
                    {...register('recap_weekstime_p50', {
                        required: 'This field is required',
                        validate: (value) =>
                            (getValues().recap_weekstime_p50 !== null &&
                                getValues().recap_weekstime_p50! >= 0 &&
                                getValues().recap_weekstime_p50! <= 100) ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow
                label="Recap Weeks (Score <= 75)"
                error={errors?.recap_weekstime_p75?.message}
            >
                <Input
                    type="number"
                    id="recap_weekstime_p75"
                    placeholder={
                        settingsRecapUser?.recap_weekstime_p75
                            ? String(settingsRecapUser?.recap_weekstime_p75)
                            : 'Enter a recap time for tests with score <= 75'
                    }
                    {...register('recap_weekstime_p75', {
                        required: 'This field is required',
                        validate: (value) =>
                            (getValues().recap_weekstime_p75 !== null &&
                                getValues().recap_weekstime_p75! >= 0 &&
                                getValues().recap_weekstime_p75! <= 100) ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow
                label="Recap Weeks (Score <= 100)"
                error={errors?.recap_weekstime_p100?.message}
            >
                <Input
                    type="number"
                    id="recap_weekstime_p100"
                    placeholder={
                        settingsRecapUser?.recap_weekstime_p100
                            ? String(settingsRecapUser?.recap_weekstime_p100)
                            : 'Enter a recap time for tests with score <= 100'
                    }
                    {...register('recap_weekstime_p100', {
                        required: 'This field is required',
                        validate: (value) =>
                            (getValues().recap_weekstime_p100 !== null &&
                                getValues().recap_weekstime_p100! >= 0 &&
                                getValues().recap_weekstime_p100! <= 100) ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>

            <FormRow
                label="Exam Days Remaining"
                error={errors?.future_exam_in_days?.message}
            >
                <Input
                    type="number"
                    id="future_exam_in_days"
                    placeholder={
                        settingsRecapUser?.recap_weekstime_p100
                            ? String(settingsRecapUser?.recap_weekstime_p100)
                            : 'Enter future exam days remaining.'
                    }
                    {...register('future_exam_in_days', {
                        required: 'This field is required',
                        validate: (value) =>
                            (getValues().future_exam_in_days !== null &&
                                getValues().future_exam_in_days! >= 0 &&
                                getValues().future_exam_in_days! <= 100) ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow
                label="Target Perfection Score (0-100)"
                error={errors?.target_perfection_score?.message}
            >
                <Input
                    type="range"
                    min="0"
                    max="100"
                    id="target_perfection_score"
                    {...register('target_perfection_score', {
                        required: 'This field is required',
                        validate: (value) =>
                            (getValues().target_perfection_score !== null &&
                                getValues().target_perfection_score! >= 0 &&
                                getValues().target_perfection_score! <= 100) ||
                            'Passwords need to match',
                    })}
                />
            </FormRow>
            <FormRow>
                <Button
                    type="reset"
                    variation="subtleWhite"
                    disabled={isGettingSettings}
                    size="small"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variation="simplePrimary"
                    disabled={isGettingSettings}
                    size="small"
                >
                    Update Recap
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdateRecap
