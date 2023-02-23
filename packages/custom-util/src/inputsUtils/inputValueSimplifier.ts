const inputValueSimplifier = (event) => {
    return event.target?.type === 'checkbox' ? event.target.checked :
           event.target.value === 'true' ? true :
           event.target.value === 'false' ? false :
           event.target.value
}

export default inputValueSimplifier;