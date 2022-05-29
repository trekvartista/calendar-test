export const formatDate = (date: Date): string => {
    // const Year = date.getFullYear();
    // const month = date.getMonth();
    // const Day = date.getDay();

    const result = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })
    return result
}