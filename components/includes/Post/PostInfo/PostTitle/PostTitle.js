import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {useRouter} from "next/router";

const PostTitle = ({title, translations}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    return (
        <h1 className='post-title'>
            <style jsx>{`
                .post-title{
                    color: var(--post-page-info-color);
                    font-size: 1.25em;
                    text-align: center;
                }
            `}</style>
            {
                translations ? translations[router.locale ?? contextData.state.activeLanguage] ?
                    translations[router.locale ?? contextData.state.activeLanguage]?.title || title :
                    title : title
            }
        </h1>
    )
};
export default PostTitle;
