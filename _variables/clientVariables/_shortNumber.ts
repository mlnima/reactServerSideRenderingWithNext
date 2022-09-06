const _shortNumber = (count: number) => {
    return count > 1000 && count < 1000000 ? (count / 1000).toFixed(1) + 'K' :
        count > 1000000 ? (count / 1000000).toFixed(1) + 'M' :
            count
}

export default _shortNumber;