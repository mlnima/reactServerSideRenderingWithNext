const shortNumber = (count: number) => {
    //@ts-ignore
    const formatter = Intl.NumberFormat('en',{notation:'compact'})
    return formatter.format(count)
}

export default shortNumber;