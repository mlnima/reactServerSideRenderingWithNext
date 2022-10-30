// import {FC, useMemo} from "react";
// import Head from "next/head";
// import {useSelector} from "react-redux";
// import {Meta, Store} from "@custom-vaiables/TypeScriptTypes/GlobalTypes";
// import {useRouter} from "next/router";
//
// const PostMetaDataToSiteHead: FC = () => {
//
//     const {asPath,locale} = useRouter()
//
//     const {locals,keywords,post} = useSelector((store: Store) => {
//         const post =  store.posts.post
//         return {
//             post,
//             keywords: [...(post.tags || []), ...(post.categories || []), ...(post.actors || [])].map((i: Meta) => i.name).join(','),
//             locals: process.env.NEXT_PUBLIC_LOCALS?.split(' '),
//         }
//     });
//
//     const hrefLangs = locals?.map(local => {
//         return <link rel="alternate"
//                      key={uniqueId('link_')}
//                      hrefLang={local}
//                      href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${ (local === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : `/${local}`) + asPath}`}
//         />
//     })
//
//     const descriptionValue = useMemo(() => {
//         return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
//             post.description :
//             post.translations?.[locale]?.description || post.description;
//     }, [post]);
//
//     return (
//         <Head>
//             <title>{post.title}</title>
//             {descriptionValue ?
//                 <meta name={'description'}
//                       content={typeof descriptionValue === 'string' ? descriptionValue : post?.title}
//                 />
//                 : null
//             }
//             <meta name={'keywords'} content={keywords}/>
//             <meta property={'og:title'} content={post.title}/>
//             <meta property={'og:type'}
//                   content={post?.postType === 'video' ?
//                   'video.other' :
//                   post?.postType}
//             />
//             <meta property={'og:url'} content={process.env.NEXT_PUBLIC_PRODUCTION_URL + asPath}/>
//             <meta property={'og:image'} content={post.mainThumbnail}/>
//             {post?.postType === 'video' ?
//                 <meta property={'og:video:duration'} content={post.duration}/>
//                 : null
//             }
//             <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}${asPath}`}/>
//
//             {hrefLangs}
//         </Head>
//     )
// };
// export default PostMetaDataToSiteHead;
//
