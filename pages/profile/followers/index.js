import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import ProfileCoverImage from '../../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import {AppContext} from "../../../context/AppContext";
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
import _ from "lodash";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";

const Followers = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [followers, setFollowers] = useState([]);


    useEffect(() => {
        if (contextData?.userData?.followers?.length >0){
            getMultipleUserDataById(contextData?.userData?.followers).then(res=>{
                setFollowers(res?.data?.users || [])
            })
        }

    }, [contextData.userData]);

   const renderFollowers = followers.map(user=>{
       return(
          <UserSmallPreview key={_.uniqueId('user_')}
                            {...user}

          />
       )
   })

    return (
        <div className='my-profile-followers-list main'>
            <style jsx>{`
            .main{
             max-width: 940px;
              margin: auto;
            }
            
            `}</style>
            <ProfileCoverImage/>
            <ProfileNavigation />
            {renderFollowers}
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
export default Followers;
