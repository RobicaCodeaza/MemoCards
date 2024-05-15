import { useState, useEffect, type Dispatch, type SetStateAction } from 'react'

type useLocalStorageStateType<T> = [T, Dispatch<SetStateAction<T>>]

export function useLocalStorageState<T>(
    initialState: T,
    key: string
): useLocalStorageStateType<T> {
    const [value, setValue] = useState<T>(function () {
        const storedValue = localStorage.getItem(key)
        if (storedValue) {
            return JSON.parse(storedValue) as T
        }

        return initialState
    })

    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value))
        },
        [value, key]
    )

    return [value, setValue]
}
