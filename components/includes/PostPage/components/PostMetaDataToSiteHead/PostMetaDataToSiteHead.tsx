import {FC, useMemo} from "react";
import Head from "next/head";
import {uniqueId} from "lodash";
import {useSelector} from "react-redux";
import {Meta, StoreTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import {useRouter} from "next/router";

const PostMetaDataToSiteHead: FC = () => {
    const post = useSelector((store: StoreTypes) => store.posts.post);
    const router = useRouter()

    const PostMetaDataToSiteHeadData = useSelector((store: StoreTypes) => {
        return {
            post: store.posts.post,
            keywords: [...(post.tags || []), ...(post.categories || []), ...(post.actors || [])].map((i: Meta) => i.name).join(','),
            locals: process.env.NEXT_PUBLIC_LOCALS?.split(' '),
        }
    });

    const hrefLangs = PostMetaDataToSiteHeadData?.locals?.map(local => {
        return <link rel="alternate"
                     key={uniqueId('link_')}
                     hrefLang={local}
                     href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${ (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : `/${local}`) + router.asPath}`}
        />
    })

    const descriptionValue = useMemo(() => {
        return PostMetaDataToSiteHeadData?.post.translations ?
            PostMetaDataToSiteHeadData?.post.translations?.[router.locale] ?
                PostMetaDataToSiteHeadData?.post.translations?.[router.locale]?.description || PostMetaDataToSiteHeadData?.post.description :
                PostMetaDataToSiteHeadData?.post.description :
            PostMetaDataToSiteHeadData?.post.description
    }, []);

    return (
        <Head>
            <title>{post.title}</title>
            {descriptionValue ?
                <meta name={'description'}
                      content={typeof descriptionValue === 'string' ? descriptionValue : post.title}
                />
                : null
            }
            <meta name={'keywords'} content={PostMetaDataToSiteHeadData.keywords}/>
            <meta property={'og:title'} content={PostMetaDataToSiteHeadData?.post.title}/>
            <meta property={'og:type'}
                  content={PostMetaDataToSiteHeadData?.post.postType === 'video' ?
                  'video.other' :
                  PostMetaDataToSiteHeadData?.post.postType}
            />
            <meta property={'og:url'} content={process.env.NEXT_PUBLIC_PRODUCTION_URL + router.asPath}/>
            <meta property={'og:image'} content={PostMetaDataToSiteHeadData?.post.mainThumbnail}/>
            {PostMetaDataToSiteHeadData?.post.postType === 'video' ?
                <meta property={'og:video:duration'} content={PostMetaDataToSiteHeadData?.post.duration}/>
                : null
            }
            {hrefLangs}
        </Head>
    )
};
export default PostMetaDataToSiteHead;

