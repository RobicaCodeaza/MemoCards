import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import {
    type SubmitHandler,
    type SubmitErrorHandler,
    useForm,
    FieldErrors,
} from 'react-hook-form'
import { useCreateDeck } from './useCreateDeck'
import { useEditDeck } from './useEditDeck'
import toast from 'react-hot-toast'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { UserType } from '@/ui/ProtectedRoute'
import { capitalizeHeader } from '@/utils/formatHeaders'

type CreateDeckFormProps = {
    deckToEdit: Tables<'Decks'> | undefined
    onCloseModal?: () => void
}

function CreateDeckForm({ deckToEdit, onCloseModal }: CreateDeckFormProps) {
    //Defining if we deal with an edit or a create

    const { id: editId, ...editValues } = deckToEdit ?? {}

    let editValuesCapitalized
    if (
        'chapter' in editValues &&
        'subchapter' in editValues &&
        'lesson' in editValues
    ) {
        editValuesCapitalized = {
            chapter: capitalizeHeader(editValues?.chapter),

            subchapter: capitalizeHeader(editValues?.subchapter),

            lesson: capitalizeHeader(editValues?.lesson),
        }
    }
    const isEditingSession = Boolean(editId)

    //Handling Create || Edit Deck
    const { isCreating, createDeck } = useCreateDeck()
    const { isUpdating, updateDeck } = useEditDeck()
    const isWorking = isCreating ?? isUpdating

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
        Tables<'Decks'>
    >({
        defaultValues: isEditingSession ? editValuesCapitalized : undefined,
    })
    const { errors } = formState

    const onSubmit: SubmitHandler<Tables<'Decks'>> = (data) => {
        data.chapter = data.chapter.toLowerCase()
        data.subchapter = data.subchapter.toLowerCase()
        data.lesson = data.lesson.toLowerCase()

        if (isEditingSession)
            updateDeck(
                { newData: data, id: editId! },
                {
                    onSuccess: () => {
                        reset()
                        onCloseModal?.()
                    },
                }
            )
        else {
            const newData = { ...data, user_id: user.user_id }
            createDeck(newData, {
                onSuccess: () => {
                    reset()
                    onCloseModal?.()
                },
            })
        }
    }

    const onError: SubmitErrorHandler<FieldErrors> = () => {
        toast.error('Error in form completion.')
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="modal">
            <FormRow label="Chapter" error={errors?.chapter?.message}>
                <Input
                    disabled={isWorking}
                    id="chapter"
                    type="text"
                    placeholder="Chapter 1"
                    {...register('chapter', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow label="Subchapter" error={errors?.subchapter?.message}>
                <Input
                    disabled={isWorking}
                    id="subchapter"
                    placeholder="Subchapter 1"
                    type="text"
                    {...register('subchapter', {
                        required: 'This Field is Required',
                    })}
                ></Input>
            </FormRow>
            <FormRow label="Lesson" error={errors?.lesson?.message}>
                <Input
                    disabled={isWorking}
                    id="lesson"
                    type="text"
                    placeholder="Lesson 1"
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
                    disabled={isWorking}
                >
                    Reset
                </Button>
                <Button
                    as="button"
                    variation="simplePrimary"
                    size="small"
                    disabled={isWorking}
                >
                    {isEditingSession ? 'Edit' : 'Add'}
                </Button>
            </FormRow>
        </Form>
    )
}

export default CreateDeckForm
