const locales = process.env.NEXT_PUBLIC_LOCALES || ''
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || ''

const languagesOptions = (locales.split(' ')
    .filter(lang => lang !== defaultLocale) || [])
    .map((lang: string) => {
        return (
            <option key={lang} value={lang}>
                {lang}
            </option>
        )
    })

export default languagesOptions