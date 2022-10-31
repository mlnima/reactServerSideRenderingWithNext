const capitalizeFirstLetters = (str: any)=> {
    try {
        return typeof str === 'string' ?
            str.split(' ')
                .map(word=>word.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()))
                .join(' ')
             :
            str
    }catch (err){
        return str
    }
}

export default capitalizeFirstLetters