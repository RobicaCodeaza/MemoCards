import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { getCardsPaginated } from '@/services/apiCards'
import { UserType } from '@/ui/ProtectedRoute'
import { PAGE_SIZE_CARDS } from '@/utils/constants'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

export function useCardsPaginated() {
    const queryClient = useQueryClient()
    const [user, __] = useLocalStorageState<UserType>(
        {
            user_id: '',
            user_provider: '',
        },
        'user'
    )

    const [searchParams, _] = useSearchParams()

    //Getting the filter value for chapter
    let filterValue = searchParams.get('chapter')
    const filterChapter =
        !filterValue || filterValue === 'All'
            ? null
            : { field: 'chapter', value: filterValue }

    //Getting the filter value for subchapter
    filterValue = searchParams.get('subchapter')
    const filterSubChapter =
        !filterValue || filterValue === 'All'
            ? null
            : { field: 'subchapter', value: filterValue }

    //Getting the filter value for lesson
    filterValue = searchParams.get('lesson')
    const filterLesson =
        !filterValue || filterValue === 'All'
            ? null
            : { field: 'lesson', value: filterValue }

    const pagination = searchParams.get('page')
        ? Number(searchParams.get('page'))
        : 1

    const { isLoading, data: { cards, count } = {} } = useQuery({
        queryKey: [
            'cards',
            filterChapter,
            filterSubChapter,
            filterLesson,
            pagination,
        ],
        queryFn: () =>
            getCardsPaginated(
                user.user_id,
                {
                    chapter: filterChapter,
                    subchapter: filterSubChapter,
                    lesson: filterLesson,
                },
                pagination
            ),
        onError: (err: Error) => toast.error(err.message),
    })

    // PRE-FETCHING
    if (!count || count !== null) {
        const pageCount = Math.ceil(count! / PAGE_SIZE_CARDS)
        if (pagination < pageCount)
            void queryClient.prefetchQuery({
                queryKey: [
                    'cards',
                    filterChapter,
                    filterSubChapter,
                    filterLesson,
                    pagination + 1,
                ],
                queryFn: () => {
                    // console.log('pre-fetch')

                    return getCardsPaginated(
                        user.user_id,
                        {
                            chapter: filterChapter,
                            subchapter: filterSubChapter,
                            lesson: filterLesson,
                        },
                        pagination + 1
                    )
                },
                retry: false,
            })

        if (pagination > 1)
            void queryClient.prefetchQuery({
                queryKey: [
                    'cards',
                    filterChapter,
                    filterSubChapter,
                    filterLesson,
                    pagination - 1,
                ],
                queryFn: () => {
                    // console.log('pre-fetch')
                    return getCardsPaginated(
                        user.user_id,
                        {
                            chapter: filterChapter,
                            subchapter: filterSubChapter,
                            lesson: filterLesson,
                        },
                        pagination - 1
                    )
                },
                retry: false,
            })
    }

    return { isLoading, cards, count }
}
