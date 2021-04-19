import {useState, useEffect, useContext, useMemo} from 'react';
import PostElement from "../PostElement/PostElement";
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";

const Posts = ({viewType,isMobile, _id,postElementSize,posts,postElementStyle}) => {
    const contextData = useContext(AppContext);

    const styleData = useMemo(() => postElementStyle || contextData.siteDesign.postElementStyle, [])
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';
    const [state,setState] = useState({
        imageWidth:320,
        svgDefaultStyle:{
            maxWidth:'25px',
            maxHeight: '25px'
        }
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                setState({
                    ...state,
                    imageWidth: window.innerWidth,
                })
            }
        }

    }, []);


    return (
        <div className={'posts-content ' + (viewType ? viewType + '-posts-content' : 'standard')}>
            { (posts || []).map(post => {
                const title = (post.translations?.[locale]?.title || post.title).replace('#', '')
                return (
                    <PostElement
                        isMobile={isMobile}

                        key={post._id}
                        viewType={viewType}
                        postElementSize={postElementSize}
                        postElementStyle={postElementStyle}
                        //state={post}
                        title={title}
                        svgDefaultStyle={state.svgDefaultStyle}
                        imageWidth={state.imageWidth}
                        postType={post.postType}
                        _id={post._id}
                        videoTrailerUrl={post.videoTrailerUrl}
                        price={post.price}
                        duration={post.duration}
                        quality={post.quality}
                        rating={post.rating}
                        mainThumbnail={post.mainThumbnail}
                    />
                )
            })}
        </div>
    );
};

export default Posts