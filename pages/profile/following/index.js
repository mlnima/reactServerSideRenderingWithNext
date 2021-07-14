import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import ProfileCoverImage from '../../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import _ from "lodash";
const Following = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [following, setFollowing] = useState([]);
    useEffect(() => {
        if (contextData?.userData?.following?.length >0){
            getMultipleUserDataById(contextData?.userData?.following).then(res=>{
                setFollowing(res?.data?.users || [])
            })
        }

    }, [contextData.userData]);

    const renderFollowing = following.map(user=>{
        return(
            <UserSmallPreview key={_.uniqueId('user_')}
                              {...user}

            />
        )
    })


    return (
        <div className='my-profile-following-list main'>
            <style jsx>{`
            .main{
             max-width: 940px;
              margin: auto;
            }
            
            `}</style>
            <ProfileCoverImage/>
            <ProfileNavigation />
            {renderFollowing}
        </div>
    );
};


export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar','profilePage'], 'profilePage')
    const widgets = firstLoadData.widgets

    return {
        props: {
            widgets,
            ...firstLoadData.widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query
        }
    }
}
export default Following;
