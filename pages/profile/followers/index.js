import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import ProfileCoverImage from '../../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import {AppContext} from "../../../context/AppContext";
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
import _ from "lodash";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {getSignedInUserData} from "../../../_variables/ajaxAuthVariables";
import ProfileImage from "../../../components/includes/MyProfileComponents/ProfileImage/ProfileImage";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Followers = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    const [followers, setFollowers] = useState([]);


    useEffect(() => {
        getSignedInUserData(['followers']).then(res => {
            contextData.dispatchUserData({
                ...contextData.userData,
                ...res.data.userData
            });
        }).catch(err => {
            console.log(err);
        })
    }, []);


    useEffect(() => {
        if (contextData?.userData?.followers?.length > 0) {
            getMultipleUserDataById(contextData?.userData?.followers).then(res => {
                setFollowers(res?.data?.users || [])
            })
        }
    }, [contextData.userData.followers]);

    const renderFollowers = followers.map(user => {
        return (
            <UserSmallPreview key={_.uniqueId('user_')} {...user} />
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

            {renderFollowers}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], 'profilePage')
    const widgets = firstLoadData.widgets

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData,
            query: context.query
        }
    }
}
export default Followers;
