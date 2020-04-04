export const likeValueCalculator = (likes, dislikes) => {
    return (likes > 0 && dislikes > 0) ? (Math.round((likes * 100) / (likes + dislikes)))
        : (likes === 0 && dislikes === 0) ? 0
            : (likes === 0 && dislikes > 0) ? 0
                : (likes > 0 && dislikes === 0) ? 100
                    : 0;

}

export const getAbsolutePath = async (req) => {
    return await req.protocol + '://' + await req.get('Host')
}

export const generateAbsolutePath = () => {
    return window.location.protocol + '//' + window.location.host
}