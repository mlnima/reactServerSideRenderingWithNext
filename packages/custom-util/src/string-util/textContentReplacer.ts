interface Replaces {
    name?: string,
    siteName?: string,
    count?: number
}

const getMonthName = (monthNumber: number): string | null => {
    const monthNames: string[] = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December'
    ];
    return monthNumber >= 1 && monthNumber <= 12 ? monthNames[monthNumber - 1] : null;
};

const textContentReplacer = (textString?: any, replaces?: Replaces) => {
    const now = new Date()
    try {
        //@ts-ignore
        return textString.replaceAll('__NAME', replaces?.name || '')
            .replaceAll('__SITE_NAME', replaces?.siteName || '')
            .replaceAll('__COUNT', replaces?.count || '')
            .replaceAll('__YEAR', now.getFullYear())
            .replaceAll('__MONTH', getMonthName(now.getMonth()))
    } catch (err) {
        return textString
    }
}
export default textContentReplacer;