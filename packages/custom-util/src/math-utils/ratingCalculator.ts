const ratingCalculator = (likes?:number, dislikes?:number) => {
    try {
        return (likes > 0 && dislikes > 0) ? (Math.round((likes * 100) / (likes + dislikes)))
            : (likes === 0 && dislikes === 0) ? 0
                : (likes === 0 && dislikes > 0) ? 0
                    : (likes > 0 && dislikes === 0) ? 100
                        : 0;
    }catch (err){
        return 0
    }


}

export default ratingCalculator