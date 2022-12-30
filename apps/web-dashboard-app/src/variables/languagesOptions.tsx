const languagesOptions = ((process.env.NEXT_PUBLIC_LOCALS || '').split(' ')
    .filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || [])
    .map((lang: string) => {
        return (
            <option key={lang} value={lang}>
                {lang}
            </option>
        )
    })

export default languagesOptions