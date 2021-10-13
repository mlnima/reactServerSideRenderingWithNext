const _passwordValidator = (password:string|undefined)=>{
    //return password? (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password):false

    //Minimum eight characters, at least one letter and one number
    return password? (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(password):false
}

export default _passwordValidator