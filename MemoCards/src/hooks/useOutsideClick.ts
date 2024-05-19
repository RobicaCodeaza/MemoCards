import { useEffect, useRef, type LegacyRef } from 'react'

type UseOutsideProps = (
    handler: () => void,
    listenCapturing: boolean
) => LegacyRef<HTMLElement>

const useOutsideClick: UseOutsideProps = (handler, listenCapturing) => {
    const ref = useRef<HTMLElement | null>(null)

    useEffect(
        function () {
            function handleClick(e: MouseEvent) {
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    console.log(e.target)
                    handler()
                }
            }
            document.addEventListener('click', handleClick, listenCapturing)
            return () =>
                document.removeEventListener(
                    'click',
                    handleClick,
                    listenCapturing
                )
        },
        [handler, listenCapturing]
    )

    return ref
}

export default useOutsideClick
