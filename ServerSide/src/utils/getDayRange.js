import { DateTime } from "luxon";

export const getDayRange = (dateString, timezone) => {
    const dt = DateTime.fromISO(dateString, { zone: timezone });

    if (!dt.isValid) {
        throw new Error(`Invalid date/timezone: ${dateString} / ${timezone}`);
    }

    const startOfDay = dt.startOf("day").toUTC().toJSDate();
    const endOfDay = dt.endOf("day").toUTC().toJSDate();

    return { startOfDay, endOfDay };
};