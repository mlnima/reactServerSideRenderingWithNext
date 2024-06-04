const mongoIdValidator = (_id:string)=>{
    try {
        return _id?.match(/^[0-9a-fA-F]{24}$/)
    }catch (err){
        return false
    }
}

export default mongoIdValidator;