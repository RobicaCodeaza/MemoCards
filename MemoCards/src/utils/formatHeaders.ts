export function capitalizeHeader(header: string) {
    const headerCopy = header
    return headerCopy
        .split(' ')
        .map((el) => el.slice(0, 1).toUpperCase() + el.slice(1))
        .join(' ')
}
