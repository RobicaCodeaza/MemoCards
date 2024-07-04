import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { UserType } from '@/ui/ProtectedRoute'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
// import { useUpdateUser } from './useUpdateUser'
// import Spinner from '@/ui/Spinner'
import { useGetRecapSettings } from './useGetRecapSettings'
import Spinner from '@/ui/Spinner'
import { useUpdateRecapSettings } from './useUpdateRecapSettings'

export type FieldValuesType = {
    recap_weekstime_p25: number | null
    recap_weekstime_p50: number | null
    recap_weekstime_p75: number | null
    recap_weekstime_p100: number | null
    future_exam_in_days: number | null
    target_perfection_score: number | null
}

export type SettingsType = {
    recap_weekstime_p25?: number | null
    recap_weekstime_p50?: number | null
    recap_weekstime_p75?: number | null
    recap_weekstime_p100?: number | null
    future_exam_in_days?: number | null
    target_perfection_score?: number | null
    user_id: string
}

function UpdateRecap() {
    const { settingsRecapUser, isGettingSettings } = useGetRecapSettings()
    const { isUpdatingRecapSettings, updateRecapSettings } =
        useUpdateRecapSettings()
    console.log('recap', settingsRecapUser)
    const [user, _] = useLocalStorageState<UserType>(
        { user_id: '', user_provider: '' },
        'user'
    )

    const { handleSubmit, register, formState, reset } =
        useForm<FieldValuesType>()
    const { errors } = formState

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        const updates = {
            ...(data.recap_weekstime_p25 && {
                recap_weekstime_p25: data.recap_weekstime_p25,
            }),
            ...(data.recap_weekstime_p50 && {
                recap_weekstime_p50: data.recap_weekstime_p50,
            }),
            ...(data.recap_weekstime_p75 && {
                recap_weekstime_p75: data.recap_weekstime_p75,
            }),
            ...(data.recap_weekstime_p100 && {
                recap_weekstime_p100: data.recap_weekstime_p100,
            }),
            ...(data.future_exam_in_days && {
                future_exam_in_days: data.future_exam_in_days,
            }),
            ...(data.target_perfection_score && {
                target_perfection_score: data.target_perfection_score,
            }),
            user_id: user.user_id,
        }

        updateRecapSettings(updates, {
            onSuccess: () => {
                reset()
            },
        })
    }

    const isWorking = isGettingSettings || isUpdatingRecapSettings

    if (isWorking) return <Spinner></Spinner>

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit)} variation="regular">
            <FormRow
                label="Recap Weeks (Score <= 25)"
                error={errors?.recap_weekstime_p25?.message}
            >
                <Input
                    type="number"
                    disabled={isWorking}
                    id="recap_weekstime_p25"
                    placeholder={
                        !Array.isArray(settingsRecapUser) &&
                        settingsRecapUser?.recap_weekstime_p25
                            ? String(settingsRecapUser?.recap_weekstime_p25)
                            : 'Enter a recap time for tests with score <= 25'
                    }
                    {...register('recap_weekstime_p25', {
                        min: {
                            value: 0,
                            message: 'Select a number between 0-3',
                        },
                        max: {
                            value: 3,
                            message: 'Select a number between 0-3',
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Recap Weeks (Score <= 50)"
                error={errors?.recap_weekstime_p50?.message}
            >
                <Input
                    type="number"
                    disabled={isWorking}
                    id="recap_weekstime_p50"
                    placeholder={
                        !Array.isArray(settingsRecapUser) &&
                        settingsRecapUser?.recap_weekstime_p50
                            ? String(settingsRecapUser?.recap_weekstime_p50)
                            : 'Enter a recap time for tests with score <= 50'
                    }
                    {...register('recap_weekstime_p50', {
                        min: {
                            value: 0,
                            message: 'Select a number between 0-4',
                        },
                        max: {
                            value: 4,
                            message: 'Select a number between 0-4',
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Recap Weeks (Score <= 75)"
                error={errors?.recap_weekstime_p75?.message}
            >
                <Input
                    type="number"
                    disabled={isWorking}
                    id="recap_weekstime_p75"
                    placeholder={
                        !Array.isArray(settingsRecapUser) &&
                        settingsRecapUser?.recap_weekstime_p75
                            ? String(settingsRecapUser?.recap_weekstime_p75)
                            : 'Enter a recap time for tests with score <= 75'
                    }
                    {...register('recap_weekstime_p75', {
                        min: {
                            value: 0,
                            message: 'Select a number between 0-5',
                        },
                        max: {
                            value: 5,
                            message: 'Select a number between 0-5',
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Recap Weeks (Score <= 100)"
                error={errors?.recap_weekstime_p100?.message}
            >
                <Input
                    type="number"
                    disabled={isWorking}
                    id="recap_weekstime_p100"
                    placeholder={
                        !Array.isArray(settingsRecapUser) &&
                        settingsRecapUser?.recap_weekstime_p100
                            ? String(settingsRecapUser?.recap_weekstime_p100)
                            : 'Enter a recap time for tests with score <= 100'
                    }
                    {...register('recap_weekstime_p100', {
                        min: {
                            value: 0,
                            message: 'Select a number between 0-6',
                        },
                        max: {
                            value: 6,
                            message: 'Select a number between 0-6',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Exam Days Remaining"
                error={errors?.future_exam_in_days?.message}
            >
                <Input
                    type="number"
                    disabled={isWorking}
                    id="future_exam_in_days"
                    placeholder={
                        !Array.isArray(settingsRecapUser) &&
                        settingsRecapUser?.future_exam_in_days
                            ? String(settingsRecapUser?.future_exam_in_days)
                            : 'Enter future exam days remaining.'
                    }
                    {...register('future_exam_in_days', {
                        min: {
                            value: 1,
                            message: 'Select a number > 0',
                        },
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
                    defaultValue={
                        !Array.isArray(settingsRecapUser) &&
                        settingsRecapUser?.target_perfection_score
                            ? settingsRecapUser?.target_perfection_score
                            : 50
                    }
                    disabled={isWorking}
                    id="target_perfection_score"
                    {...register('target_perfection_score', {
                        min: 0,
                        max: 100,
                    })}
                />
            </FormRow>
            <FormRow>
                <Button
                    type="reset"
                    variation="subtleWhite"
                    disabled={isWorking}
                    size="small"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variation="simplePrimary"
                    disabled={isWorking}
                    size="small"
                >
                    Update Recap
                </Button>
            </FormRow>
        </Form>
    )
}

export default UpdateRecap
