 const capitalizeFirstLetter = (str: unknown)=> {
    try {
        return typeof str === 'string' ? str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) :str
    }catch (err){
        return str
    }
 }

 export default capitalizeFirstLetter