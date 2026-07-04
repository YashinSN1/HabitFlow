export const getDayRange = (dateString) => {
    const startOfDay = new Date(dateString);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(dateString);
    endOfDay.setUTCHours(23, 59, 59, 999);

    return { startOfDay, endOfDay };
};
