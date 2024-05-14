import { createEditDeck } from '@/services/apiDecks'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import {
    type SubmitHandler,
    SubmitErrorHandler,
    useForm,
} from 'react-hook-form'
import { useCreateDeck } from './useCreateDeck'
import { useEditDeck } from './useEditDeck'

type CreateDeckFormProps = {
    deckToEdit: Tables<'Decks'> | undefined
    onCloseModal?: () => void
}

function CreateDeckForm({ deckToEdit, onCloseModal }: CreateDeckFormProps) {
    const { id: editId, ...editValues } = deckToEdit ?? {}

    const isEditingSession = Boolean(editId)

    const { handleSubmit, register, reset, getValues, formState } = useForm<
        Tables<'Decks'>
    >({
        defaultValues: isEditingSession ? editValues : undefined,
    })

    const { errors } = formState

    const { isCreating, createDeck } = useCreateDeck()
    const { isUpdating, updateDeck } = useEditDeck()
    const isWorking = isCreating ?? isUpdating

    const onSubmit: SubmitHandler<Tables<'Decks'>> = (data) => {
        data.chapter = data.chapter.toLowerCase()
        data.subchapter = data.chapter.toLowerCase()
        data.lesson = data.chapter.toLowerCase()

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
        else
            createDeck(data, {
                onSuccess: () => {
                    reset()
                    onCloseModal?.()
                },
            })
    }

    const onError: SubmitErrorHandler<Tables<'Decks'>> = () => {
        console.log('error')
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="modal">
            <FormRow label="chapter" error={errors?.chapter?.message}>
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
            <FormRow label="subchapter" error={errors?.subchapter?.message}>
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
            <FormRow label="lesson" error={errors?.lesson?.message}>
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
