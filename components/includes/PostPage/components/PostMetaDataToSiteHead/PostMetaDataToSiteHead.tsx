import Head from "next/head";
import _ from "lodash";
import {useSelector} from "react-redux";
import {settingsPropTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import {useRouter} from "next/router";
import {useState} from "react";

const PostMetaDataToSiteHead = () => {
    const post = useSelector((store: settingsPropTypes) => store.posts.post);
    const router = useRouter()

    // @ts-ignore
    const keywords = [...(post.tags || []), ...(post.categories || []), ...(post.actors || [])].map((i) => i.name);
    const locals = process.env.NEXT_PUBLIC_LOCALS?.split(' ');
    const postUrls = locals?.map(local => {
        if (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL) {
            return <link rel="alternate" key={_.uniqueId('link_')} hrefLang={local} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL + router.asPath}`}/>
        } else return <link rel="alternate" key={_.uniqueId('link_')} hrefLang={local} href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${local + router.asPath}`}/>
    })

    const [descriptionValue, setDescriptionValue] = useState(() => {
        // @ts-ignore
        return post.translations ? post.translations?.[router.locale] ? post.translations?.[router.locale]?.description || post.description : post.description : post.description
    });



    return (
        <Head>
            <title>{post.title}</title>
            {descriptionValue ? <meta name="description" content={typeof descriptionValue === 'string' ? descriptionValue:post.title}/> :null }
            {/*// @ts-ignore*/}
            <meta name="keywords" content={keywords}/>
            <meta property="og:title" content={post.title}/>
            {postUrls}
            <meta property="og:type" content={post.postType === 'video' ? post.postType + '.' + 'other' : post.postType}/>
            {/*// @ts-ignore*/}
            <meta property="og:url" content={process.env.NEXT_PUBLIC_PRODUCTION_URL + router.asPath}/>
            <meta property="og:image" content={post.mainThumbnail}/>
            {post.postType === 'video' ? <meta property="og:video:duration" content={post.duration}/> : null}
        </Head>
    )
};
export default PostMetaDataToSiteHead;

