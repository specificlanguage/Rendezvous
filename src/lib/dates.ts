/**
 * transformDateToTimezone - formats a ISO datestring into a readable DATE in the local time zone (no time included)
 * @param dateStr - A dateString formatted in UTC ISO
 * @returns Date - representing the string in current time zone.
 */
export function transformDateToTimezone(dateStr: string) {
    const dt = new Date(dateStr);
    return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
}
