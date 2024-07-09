export const emailValidator = email => {
    if (!email) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};
export const passwordValidatorRegisterForm = password => {
    if (!password) return false;
    return password
        ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/.test(password)
        : false;
};
export const usernameValidatorRegisterForm = username => {

    if (!username) return false;
    const regex = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
    let isValid = regex.test(username);

    if (username.toLowerCase().includes('admin')) {
        isValid = false;
    }
    return isValid;
};

// export const usernameValidatorRegisterForm = username => {
//     if (!username) return false;
//     const regex = /^[a-z0-9]{6,16}$/;
//     let isValid = regex.test(username);
//     if (username.toLowerCase().includes('admin')) {
//         isValid = false;
//     }
//     return isValid;
// };