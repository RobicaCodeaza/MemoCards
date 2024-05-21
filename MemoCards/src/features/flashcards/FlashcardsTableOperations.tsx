import Select from '@/ui/Select'
import { useDecks } from '../decks/useDecks'
import { capitalizeHeader } from '@/utils/formatHeaders'
import Spinner from '@/ui/Spinner'
import Empty from '@/ui/Empty'
import { useSearchParams } from 'react-router-dom'

function FlaschardsTableOperation() {
    const { decks, isLoading } = useDecks()
    const [searchParams, setSearchParams] = useSearchParams()

    function handleChange(
        e: React.ChangeEvent<HTMLSelectElement>,
        field: string
    ) {
        searchParams.set(field, e.target.value)
        if (searchParams.get('page')) searchParams.set('page', '1')
        setSearchParams(searchParams)
    }
    const chapterValue = searchParams.get('chapter') ?? 'All'
    const subChapterValue = searchParams.get('subchapter') ?? 'All'
    const lessonValue = searchParams.get('lesson') ?? 'All'

    //Taking into account if there is no existing deck but deck.length === 0 still allows the component to render
    //This is the behavior we want for the app
    if (isLoading) return <Spinner></Spinner>

    if (decks === undefined || decks.length === 0)
        return <Empty resource="cards"></Empty>

    const selectOptionsChapter = decks.map((deck) => {
        return {
            value: deck.chapter,
            label: capitalizeHeader(deck.chapter),
        }
    })
    selectOptionsChapter.unshift({ value: 'All', label: 'All - Chapters' })

    const selectOptionsSubChapter = decks.map((deck) => {
        return {
            value: deck.subchapter,
            label: capitalizeHeader(deck.subchapter),
        }
    })
    selectOptionsSubChapter.unshift({
        value: 'All',
        label: 'All - SubChapters',
    })
    const selectOptionsLesson = decks.map((deck) => {
        return {
            value: deck.lesson,
            label: capitalizeHeader(deck.lesson),
        }
    })
    selectOptionsLesson.unshift({ value: 'All', label: 'All - Lessons' })

    return (
        <div className="flex flex-col items-center gap-2 tab-land:flex-row tab-land:gap-6">
            <Select
                value={chapterValue}
                onChange={(e) => handleChange(e, 'chapter')}
                options={selectOptionsChapter}
            ></Select>
            <Select
                value={subChapterValue}
                onChange={(e) => handleChange(e, 'subchapter')}
                options={selectOptionsSubChapter}
            ></Select>
            <Select
                value={lessonValue}
                onChange={(e) => handleChange(e, 'lesson')}
                options={selectOptionsLesson}
            ></Select>
        </div>
    )
}

export default FlaschardsTableOperation
