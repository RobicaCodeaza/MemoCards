import Button from '@/ui/Button'
import Form from '@/ui/Form'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import Spinner from '@/ui/Spinner'
import Select from '@/ui/Select'
import toast from 'react-hot-toast'

import { Dispatch, SetStateAction } from 'react'
import {
    type FieldError,
    type SubmitErrorHandler,
    useForm,
    type SubmitHandler,
} from 'react-hook-form'
import { useDecks } from '../decks/useDecks'
import { useGetDeckIdForCard } from '../decks/useGetDeckIdForCard'
import { createSelectOptions } from './FlashcardsTableOperations'
import Empty from '@/ui/Empty'

type FieldValuesType = {
    numAnswers: number
    chapter: string
    subChapter: string
    lesson: string
}

type ConfirmFormTypeProps = {
    setNumAnswers: Dispatch<SetStateAction<number>>
    setDeckId: Dispatch<SetStateAction<number>>
    deckIdFromEditing?: number
}

function ConfirmFormType({
    setNumAnswers,
    setDeckId,
    deckIdFromEditing,
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
    if (decks.length === 0) {
        return <Empty resource="decks"></Empty>
    }

    const defaultChapter = decks.find(
        (deck) => deck.id === deckIdFromEditing
    )?.chapter
    const defaultSubchapter = decks.find(
        (deck) => deck.id === deckIdFromEditing
    )?.subchapter
    const defaultLesson = decks.find(
        (deck) => deck.id === deckIdFromEditing
    )?.lesson

    const selectOptionsChapter = createSelectOptions(decks, 'chapter')
    const selectOptionsSubChapter = createSelectOptions(decks, 'subchapter')
    const selectOptionsLesson = createSelectOptions(decks, 'lesson')

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
                        min: {
                            value: 1,
                            message:
                                'Please provide a pozitive value bigger than 1(answer per question).',
                        },
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
                    defaultValue={defaultChapter}
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
                    defaultValue={defaultSubchapter}
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
                    defaultValue={defaultLesson}
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
