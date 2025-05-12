import React from 'react';

const LanguagesOptions = ({ languages }:{languages:string}) => {
    return (
        <>
            {(
                (languages || '')
                    .split(' ')
                    .filter(
                        lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
                    ) || []
            ).map(lang => {
                return (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                );
            })}
        </>
    );
};

export default LanguagesOptions
