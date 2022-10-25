const _shortNumber = (count: number) => {
 const formatter = Intl.NumberFormat('en',{notation:'compact'})
    return formatter.format(count)
}

export default _shortNumber;


// return count > 1000 && count < 1000000 ? (count / 1000).toFixed(1) + 'K' :
//     count > 1000000 ? (count / 1000000).toFixed(1) + 'M' :
//         count