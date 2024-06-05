const passwordValidatorRegisterForm = password => {
    if (!password) return false;
    return password
        ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/.test(password)
        : false;
};

module.exports = passwordValidatorRegisterForm;
