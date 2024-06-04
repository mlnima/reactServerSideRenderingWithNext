const convertVariableNameToName = (str:string)=>{
    try {
        return str.replace(/([A-Z])/g, " $1")
                  .charAt(0).toUpperCase() + str
                  .replace(/([A-Z])/g, " $1")
                  .slice(1)

    }catch (err){
        return str
    }
}

export default convertVariableNameToName