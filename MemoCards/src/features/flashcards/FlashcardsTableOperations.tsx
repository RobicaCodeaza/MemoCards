import Select from '@/ui/Select'
import { useDecks } from '../decks/useDecks'
import { capitalizeHeader } from '@/utils/formatHeaders'
import Spinner from '@/ui/Spinner'
import Empty from '@/ui/Empty'
import { useSearchParams } from 'react-router-dom'
import { Tables } from '@/types/database.types'

type FieldTypes = 'chapter' | 'subchapter' | 'lesson'

const createSelectOptions = function (
    array: Tables<'Decks'>[],
    field: FieldTypes
) {
    const arrayOptions = array.map((el) => {
        return {
            value: el[field],
            label: capitalizeHeader(el[field]),
        }
    })

    const arrayWithoutDuplicates = Array.from(
        new Map(arrayOptions.map((el) => [el.label, el.value]))
    )
    const arrayOptionsWithoutDuplicates = arrayWithoutDuplicates.map((el) => {
        return { label: capitalizeHeader(el[0]), value: el[1] }
    })
    return arrayOptionsWithoutDuplicates
}

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

    if (decks === undefined) return <Empty resource="cards"></Empty>

    const selectOptionsChapter = createSelectOptions(decks, 'chapter')
    selectOptionsChapter.unshift({ value: 'All', label: 'All - Chapters' })

    const selectOptionsSubChapter = createSelectOptions(decks, 'subchapter')
    selectOptionsSubChapter.unshift({
        value: 'All',
        label: 'All - SubChapters',
    })

    const selectOptionsLesson = createSelectOptions(decks, 'lesson')
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
export { createSelectOptions }
export default FlaschardsTableOperation
