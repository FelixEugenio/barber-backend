
export function isValidDate(dateString: Date): boolean {
    const date = new Date(dateString);
    return  !isNaN(date.getTime());
}