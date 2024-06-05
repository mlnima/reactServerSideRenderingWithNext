const usernameValidatorRegisterForm = username => {
    if (!username) return false;
    const regex = /^[a-z0-9]{6,16}$/;
    let isValid = regex.test(username);
    if (username.toLowerCase().includes('admin')) {
        isValid = false;
    }
    return isValid;
};

module.exports = usernameValidatorRegisterForm;
