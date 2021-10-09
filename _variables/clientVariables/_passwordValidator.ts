const _passwordValidator = (password:string|undefined)=>{
    return password? (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password):false
}

export default _passwordValidator