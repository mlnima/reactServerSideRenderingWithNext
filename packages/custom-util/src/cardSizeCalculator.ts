const cardSizeCalculator = (cardSize:string)=>{
    return cardSize === 'list' ? 116.6 :
           cardSize === 'smaller' ? 209.8 :
           cardSize === 'small' ? 255 :
           cardSize === 'medium' ? 320 : 255
}

export default cardSizeCalculator