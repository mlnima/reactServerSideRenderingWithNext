export const convertDateToIsoString = dateString => {
    try {
        const ISO8601Date = new Date(dateString);
        if (ISO8601Date) {
            return ISO8601Date.toISOString();
        } else return null;
    } catch (err) {
        return dateString;
    }
};

export const convertDurationStringToIso8601 = duration => {
    try {
        const splitDuration = duration.split(':');
        const seconds = parseInt(splitDuration[splitDuration.length - 1]);
        const minutes = parseInt(splitDuration[splitDuration.length - 2]);
        const hours = parseInt(
            splitDuration.length === 3
                ? splitDuration[splitDuration.length - 3]
                : '0',
        );
        return `P0DT${hours}H${minutes}M${seconds}S`;
    } catch (error) {
        return duration;
    }
};
export const convertSecondsToTimeString = seconds => {
    return (
        Math.floor(seconds / 60) +
        ':' +
        ('0' + Math.floor(seconds % 60)).slice(-2)
    );
};

export const formatDatePostCard = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
    // return 'xxxx'
};