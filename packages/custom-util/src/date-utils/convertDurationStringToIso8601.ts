const convertDurationStringToIso8601 = (duration: string) => {
    try {
        const splitDuration = duration.split(':')
        const seconds = parseInt(splitDuration[splitDuration.length - 1])
        const minutes = parseInt(splitDuration[splitDuration.length - 2])
        const hours = parseInt(splitDuration.length === 3 ? splitDuration[splitDuration.length - 3] : '0')
        return `P0DT${hours}H${minutes}M${seconds}S`
    }catch (error){
        return duration
    }
}

export default convertDurationStringToIso8601
