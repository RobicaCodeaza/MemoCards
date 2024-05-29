import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { UserType } from '@/ui/ProtectedRoute'
import {
    FieldErrors,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

type CreateQuizFormProps = {
    quizToEdit: Tables<'Quizes'> | undefined
    onCloseModal?: () => void
}

function CreateQuizForm({ quizToEdit, onCloseModal }: CreateQuizFormProps) {
    //Defining if we deal with an edit or a create

    const { id: editId, ...editValues } = quizToEdit ?? {}

    const isEditingSession = Boolean(editId)

    //Handling Create || Edit Deck
    // const { isCreating, createDeck } = useCreateDeck()
    // const { isUpdating, updateDeck } = useEditDeck()
    // const isWorking = isCreating ?? isUpdating

    //Getting User_id for the form creation of an object
    const [user, _] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    //Handling Form
    const { handleSubmit, register, reset, formState } = useForm<
        Tables<'Quizes'>
    >({
        defaultValues: isEditingSession ? editValues : undefined,
    })
    const { errors } = formState

    const onSubmit: SubmitHandler<Tables<'Quizes'>> = (data) => {
        console.log(data)
        // if (isEditingSession)
        //     updateDeck(
        //         { newData: data, id: editId! },
        //         {
        //             onSuccess: () => {
        //                 reset()
        //                 onCloseModal?.()
        //             },
        //         }
        //     )
        // else {
        //     const newData = { ...data, user_id: user.user_id }
        //     createDeck(newData, {
        //         onSuccess: () => {
        //             reset()
        //             onCloseModal?.()
        //         },
        //     })
        // }
    }

    const onError: SubmitErrorHandler<FieldErrors> = () => {
        toast.error('Error in form completion.')
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="modal">
            <FormRow label="Quiz Name" error={errors?.quizName?.message}>
                <Input
                    disabled={false}
                    id="quizName"
                    type="text"
                    placeholder="Quiz num 1"
                    {...register('quizName', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow
                label="Question Time(sec)"
                error={errors?.questionTime?.message}
            >
                <Input
                    disabled={false}
                    id="questionTime"
                    type="number"
                    placeholder="60"
                    {...register('questionTime', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow label="Quiz Time(min)" error={errors?.quizTime?.message}>
                <Input
                    disabled={false}
                    id="quizTime"
                    placeholder="5"
                    type="number"
                    {...register('quizTime', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>

            <FormRow label="Quiz Time(min)" error={errors?.quizTime?.message}>
                <Input
                    disabled={false}
                    id="quizTime"
                    placeholder="5"
                    type="number"
                    {...register('quizTime', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>

            <FormRow label="Decks" error={errors?.decksId?.message}>
                <Input
                    disabled={false}
                    id="decksId"
                    placeholder="5"
                    type="checkbox"
                    {...register('decksId', {
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
                    disabled={false}
                >
                    Reset
                </Button>
                <Button
                    as="button"
                    variation="simplePrimary"
                    size="small"
                    disabled={false}
                >
                    {isEditingSession ? 'Edit' : 'Add'}
                </Button>
            </FormRow>
        </Form>
    )
}

export default CreateQuizForm
