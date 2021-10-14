import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import {AppContext} from "../../../context/AppContext";
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
// @ts-ignore
import _ from "lodash";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {getSignedInUserData} from "../../../_variables/ajaxAuthVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../../store/store";

const Followers = (props:ClientPagesTypes) => {
    const contextData = useContext(AppContext);
    const [followers, setFollowers] = useState([]);


    useEffect(() => {
        getSignedInUserData(['followers']).then(res => {

            contextData.dispatchUserData({
                ...contextData.userData,
                // @ts-ignore
                ...res.data.userData
            });
        }).catch(err => {
            console.log(err);
        })
    }, []);


    useEffect(() => {
        if (contextData?.userData?.followers?.length > 0) {
            getMultipleUserDataById(contextData?.userData?.followers).then(res => {
                // @ts-ignore
                setFollowers(res?.data?.users || [])
            })
        }
    }, [contextData.userData.followers]);

    const renderFollowers = followers.map((user,index) => {
        return (
            <UserSmallPreview key={index} {...user} />
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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], store)
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData,
            query: context.query
        }
    }
})
export default Followers;
