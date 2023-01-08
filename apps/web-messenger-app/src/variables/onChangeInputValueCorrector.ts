const onChangeInputValueCorrector = (e:any) =>{
    return  e.target?.type === 'checkbox' ? e.target.checked :
        e.target.value === 'true' ? true :
            e.target.value === 'false' ? false :
                e.target.value
}

export default onChangeInputValueCorrector