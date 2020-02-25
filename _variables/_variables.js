export const likeValueCalculator = (likes, dislikes) => {
    let finalValue = 0;


    return  (likes > 0 && dislikes > 0) ? (Math.round((likes * 100) / (likes + dislikes)))
            : (likes === 0 && dislikes === 0) ? 0
            :(likes === 0 && dislikes > 0) ?  0
            :(likes > 0 && dislikes === 0) ? 100
            :0;





    //
    // if (likes > 0 && dislikes > 0) {
    //     let total = likes + dislikes;
    //     let likesTo100 = likes * 100;
    //     let value = Math.round(likesTo100 / total);
    //     finalValue = value;
    // }
    // if (likes === 0 && dislikes === 0) {
    //     finalValue = 0;
    // }
    // if (likes === 0 && dislikes > 0) {
    //     finalValue = 0;
    //
    // }
    // if (likes > 0 && dislikes === 0) {
    //     finalValue = 100
    // }
    // return finalValue

}