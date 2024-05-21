import Select from '@/ui/Select'
import { useDecks } from '../decks/useDecks'
import { capitalizeHeader } from '@/utils/formatHeaders'
import Spinner from '@/ui/Spinner'

function FlaschardsTableOperation() {
    const { decks, isLoading } = useDecks()

    //Taking into account if there is no existing deck but deck.length === 0 still allows the component to render
    //This is the behavior we want for the app
    if (isLoading) <Spinner></Spinner>

    if (!decks) return

    const selectOptionsChapter = decks.map((deck) => {
        return {
            value: deck.chapter,
            label: capitalizeHeader(deck.chapter),
        }
    })
    selectOptionsChapter.unshift({ value: '*', label: 'All - Chapters' })

    const selectOptionsSubChapter = decks.map((deck) => {
        return {
            value: deck.subchapter,
            label: capitalizeHeader(deck.subchapter),
        }
    })
    selectOptionsSubChapter.unshift({
        value: '*',
        label: 'All - SubChapters',
    })

    const selectOptionsLesson = decks.map((deck) => {
        return {
            value: deck.lesson,
            label: capitalizeHeader(deck.lesson),
        }
    })
    selectOptionsLesson.unshift({ value: '*', label: 'All - Lessons' })

    console.log(selectOptionsLesson)

    return (
        <div className="flex flex-col items-center gap-2 tab-land:flex-row tab-land:gap-6">
            <Select options={selectOptionsChapter}></Select>
            <Select options={selectOptionsSubChapter}></Select>
            <Select options={selectOptionsLesson}></Select>
        </div>
    )
}

export default FlaschardsTableOperation
