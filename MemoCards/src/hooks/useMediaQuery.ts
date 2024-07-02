// import { useMediaQuery } from 'react-responsive'
import { useMediaQuery } from 'usehooks-ts'

export type QueryTypes =
    | '37.5em'
    | '56.25em'
    | '75em'
    | '98.5em'
    | '112.5em'
    | '120em'

function useMediaQueryResize(
    query: QueryTypes,
    basicQuery = 'max-width'
): boolean {
    const queryResponsive = `(${basicQuery}:${query})`
    const matches = useMediaQuery(queryResponsive)

    return matches
}

const phone = '37.5em'
const tabPort = '56.25em'
const tabLand = '75em'
const particularSmallLaptop = '98.5em'
const laptop = '112.5em'
const bigDesktop = '120em'

export { phone, tabPort, tabLand, particularSmallLaptop, laptop, bigDesktop }

export default useMediaQueryResize
