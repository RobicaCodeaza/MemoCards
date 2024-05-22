import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import { Dispatch, SetStateAction } from 'react'
import {
    type FieldError,
    type SubmitErrorHandler,
    useForm,
    type SubmitHandler,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDecks } from '../decks/useDecks'
import Select from '@/ui/Select'
import { useGetDeckIdForCard } from '../decks/useGetDeckIdForCard'
import Spinner from '@/ui/Spinner'
import { capitalizeHeader } from '@/utils/formatHeaders'
import { createSelectOptions } from './FlashcardsTableOperations'

type FieldValuesType = {
    numAnswers: number
    chapter: string
    subChapter: string
    lesson: string
}

type ConfirmFormTypeProps = {
    setNumAnswers: Dispatch<SetStateAction<number>>
    setDeckId: Dispatch<SetStateAction<number>>
}

function ConfirmFormType({
    setNumAnswers,
    setDeckId,
    cardToEdit,
}: ConfirmFormTypeProps) {
    const { getDeckIdForCard, isGettingDeck } = useGetDeckIdForCard()
    const { register, handleSubmit, formState, reset } =
        useForm<FieldValuesType>()
    const { errors } = formState

    const onSubmit: SubmitHandler<FieldValuesType> = (data) => {
        const dataForGettingCard = {
            chapter: data.chapter.toLowerCase(),
            subChapter: data.subChapter.toLowerCase(),
            lesson: data.lesson.toLowerCase(),
        }
        getDeckIdForCard(dataForGettingCard, {
            onSuccess: (deckId) => {
                setDeckId(deckId)
                setNumAnswers(data.numAnswers)
                reset()
            },
        })
    }
    const onError: SubmitErrorHandler<FieldError> = () => {
        toast.error('Error in completing fields.')
    }

    const { decks, isLoading } = useDecks()

    //Taking into account if there is no existing deck but deck.length === 0 still allows the component to render
    //This is the behavior we want for the app
    if (!decks) return

    const selectOptionsChapter = createSelectOptions(decks, 'chapter')
    const selectOptionsSubChapter = createSelectOptions(decks, 'subchapter')
    const selectOptionsLesson = createSelectOptions(decks, 'lesson')

    //Getting Default filter Value

    if (isLoading) return <Spinner></Spinner>

    if (isGettingDeck) return <Spinner></Spinner>

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} variation="regular">
            <FormRow
                label="number of answers"
                error={errors?.numAnswers?.message}
            >
                <Input
                    disabled={isGettingDeck}
                    type="number"
                    id="numAnswers"
                    placeholder="ex: 1"
                    {...register('numAnswers', {
                        required: 'This field is required',
                    })}
                ></Input>
            </FormRow>

            <FormRow
                label="Select the Chapter"
                error={errors?.chapter?.message}
            >
                <Select
                    disabled={isGettingDeck}
                    id="chapter"
                    options={selectOptionsChapter}
                    {...register('chapter', {
                        required: 'This field is required',
                    })}
                ></Select>
            </FormRow>

            <FormRow
                label="Select the SubChapter"
                error={errors?.subChapter?.message}
            >
                <Select
                    disabled={isGettingDeck}
                    id="subChapter"
                    options={selectOptionsSubChapter}
                    // value={''}
                    {...register('subChapter', {
                        required: 'This field is required',
                    })}
                ></Select>
            </FormRow>
            <FormRow label="Select the Lesson" error={errors?.lesson?.message}>
                <Select
                    disabled={isGettingDeck}
                    id="lesson"
                    options={selectOptionsLesson}
                    {...register('lesson', {
                        required: 'This field is required',
                    })}
                ></Select>
            </FormRow>

            <div className="flex justify-end gap-5">
                <Button variation="subtleWhite" size="small">
                    Cancel
                </Button>
                <Button variation="simplePrimary" size="small">
                    Next
                </Button>
            </div>
        </Form>
    )
}

export default ConfirmFormType
