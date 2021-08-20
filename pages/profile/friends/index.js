import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import ProfileCoverImage from '../../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import _ from "lodash";
import {AppContext} from "../../../context/AppContext";
import {getSignedInUserData} from "../../../_variables/ajaxAuthVariables";
import ProfileImage from "../../../components/includes/MyProfileComponents/ProfileImage/ProfileImage";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
const index = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getSignedInUserData(['friends']).then(res => {
            contextData.dispatchUserData({
                ...contextData.userData,
                ...res.data.userData
            });
        }).catch(err => {
            console.log(err);
        })
    }, []);


    useEffect(() => {
        if (contextData?.userData?.friends?.length >0){
            getMultipleUserDataById(contextData?.userData?.friends).then(res=>{
                setFriends(res?.data?.users || [])
            })
        }
    }, [contextData.userData.friends]);

    const renderFriends = friends.map(user=>{
        return(
            <UserSmallPreview key={_.uniqueId('user_')}
                              {...user}

            />
        )
    })
    return (
        <div className='my-profile-friends main'>
            <style jsx>{`
            .main{
             max-width: 940px;
              margin: auto;
            }
            
            `}</style>
            <ProfileImage/>
            <ProfileNavigation />
            {renderFriends}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar','profilePage'], 'profilePage')
    const widgets = firstLoadData.widgets

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets,
            ...firstLoadData.widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query
        }
    }
}
export default index;
