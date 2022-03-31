const arraySortRandom = (arrayData)=>{
    if (Array.isArray(arrayData)){
        try {
            return arrayData?.sort(() => Math.random() - 0.5);

        }catch (err){
            return arrayData
        }
    }else return arrayData
}

module.exports = arraySortRandom