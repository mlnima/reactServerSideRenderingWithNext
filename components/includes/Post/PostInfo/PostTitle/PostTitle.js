import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {useRouter} from "next/router";

const PostTitle = ({title, translations}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    return (
        <h1 className='post-title'>
            {
                translations ?  translations[router.locale ?? contextData.state.activeLanguage] ?
                translations[router.locale ?? contextData.state.activeLanguage]?.title || title :
                title :title
            }
        </h1>
    )
};
export default PostTitle;
