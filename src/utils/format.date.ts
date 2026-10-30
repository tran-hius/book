export function parseDateDMY(value: string): Date | null {
    const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(value);

    if (!match) {
        return null;
    }

    const [, dayStr, monthStr, yearStr] = match;

    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return null;
    }

    return date;
}