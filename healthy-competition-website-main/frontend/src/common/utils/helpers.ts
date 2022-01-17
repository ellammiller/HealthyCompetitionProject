
export const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
});

export function addDays(date: Date | string, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
