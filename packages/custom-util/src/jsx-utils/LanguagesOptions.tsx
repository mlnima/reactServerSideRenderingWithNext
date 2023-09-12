import React, {FC} from "react";

interface IProps{
    languages:string
}

const LanguagesOptions:FC<IProps> = ({languages})=>{
    console.log('languages=> ',languages)
    return(
        <>
            {(
                (languages || '').split(" ").filter(
                    (lang) => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
                ) || []
            ).map((lang: string) => {
                return (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                );
            })}
        </>
    )
}

export default LanguagesOptions