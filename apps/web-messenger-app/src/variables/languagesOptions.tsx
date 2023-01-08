const locales = process.env.NEXT_PUBLIC_LOCALS || ''
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCAL || ''

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