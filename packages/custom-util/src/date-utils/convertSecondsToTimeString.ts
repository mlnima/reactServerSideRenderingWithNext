const convertSecondsToTimeString = (seconds) =>{
    return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)
}

export default convertSecondsToTimeString;