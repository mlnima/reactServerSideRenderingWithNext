const {postTypes} = require("data-structures");
const postTypeQueryMatcher = `:postType(${postTypes.join('|')})?`
const languageQueryMatcher = `(${process.env.NEXT_PUBLIC_LOCALS.split(' ').join('|')})`;

module.exports = async () => {
    return [
        {
            source: `/${languageQueryMatcher}/meta`,
            destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCAL}/categories`,
            permanent: true,
        },
        {
            source: `/meta`,
            destination: `/${process.env.NEXT_PUBLIC_DEFAULT_LOCAL}/categories`,
            permanent: true,
        },

    ]
}
