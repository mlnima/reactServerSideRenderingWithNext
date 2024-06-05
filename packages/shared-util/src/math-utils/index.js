export const randomNumberGenerator = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
};

export const rangeNumGenerator = (currentPageInput, max) => {
    let currentPage = currentPageInput,
        range = 6,
        maxPage = max - 1,
        start = 2;
    let paging = [];

    if (currentPage < range / 2 + 1) {
        start = 1;
    } else if (currentPage >= maxPage - range / 2) {
        start = Math.floor(maxPage - range + 1);
    } else {
        start = currentPage - Math.floor(range / 2);
    }

    for (let i = start; i <= start + range - 1; i++) {
        if (i === currentPage) {
            paging.push(i);
        } else {
            paging.push(i);
        }
    }
    return paging;
};

export const ratingCalculator = (likes, dislikes) => {
    try {
        return likes > 0 && dislikes > 0
            ? Math.round((likes * 100) / (likes + dislikes))
            : likes === 0 && dislikes === 0
                ? 0
                : likes === 0 && dislikes > 0
                    ? 0
                    : likes > 0 && dislikes === 0
                        ? 100
                        : 0;
    } catch (err) {
        return 0;
    }
};

export const shortNumber = count => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(count);
};


