import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import ProfileCoverImage from '../../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import {AppContext} from "../../../context/AppContext";
import {getPosts} from "../../../_variables/ajaxPostsVariables";
import {useRouter} from "next/router";
const Posts = props => {
    const contextData = useContext(AppContext);
    const router = useRouter();
    const [state, setState] = useState({
        posts:[],
        totalCount: 0
    });
    useEffect(() => {
        if (contextData?.userData?.username &&contextData?.userData?._id && contextData?.userData?.username !== 'guest' ){
            const getPostsData = {
                size:   parseInt(router.query.size) ||  30,
                pageNo: parseInt(router.query.page) || 1,
                postType: router.query.type || 'all',
                fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration','postType','price' ],
                keyword: router.query.keyword || '',
                author: contextData.userData._id || 'all',
                actor: router.query.actor || 'all',
                status: router.query.status|| 'published',
                tag: router.query.tag || 'all',
                category: router.query.category || 'all',
                sort: router.query.sort || 'latest',
            }
            getPosts(getPostsData,  window.location.origin,true,window.location.href).then(res=>{
                setState({
                    ...state,
                    posts:res?.data?.posts,
                    totalCount: res?.data?.totalCount
                })
            })
        }
    }, []);
    return (
        <div className='my-profile-posts main'>
            <style jsx>{`
            .my-profile-posts{
            
            }
           ` }</style>
            <ProfileCoverImage/>
            <ProfileNavigation />
            {/*<Posts posts={ state.posts || [] }/>*/}
            {/*posts*/}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar','profilePage'], 'profilePage')

    return {
        props: {
            widgets : firstLoadData.widgets,
            ...firstLoadData.widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query
        }
    }
}
export default Posts;
