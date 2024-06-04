const passwordValidatorRegisterForm = (password: string | undefined) => {
    if (!password)return false
    return password? (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/).test(password):false
}

export default passwordValidatorRegisterForm;