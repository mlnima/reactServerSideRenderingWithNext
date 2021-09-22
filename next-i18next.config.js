module.exports = {
    i18n: {
        defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCAL,
        locales: process.env.NEXT_PUBLIC_LOCALS.split(' '),
    },
};