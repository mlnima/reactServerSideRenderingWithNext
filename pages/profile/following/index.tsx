import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
// @ts-ignore
import _ from "lodash";
import {getSignedInUserData} from "../../../_variables/ajaxAuthVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../../store/store";
const Following = (props:ClientPagesTypes) => {
    const contextData = useContext(AppContext);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        getSignedInUserData(['following']).then(res => {
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
        if (contextData?.userData?.following?.length >0){
            getMultipleUserDataById(contextData?.userData?.following).then(res=>{
                setFollowing(res?.data?.users || [])
            })
        }

    }, [contextData.userData.following]);

    const renderFollowing = following.map((user,index)=>{
        return(
            <UserSmallPreview key={index}
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

            {renderFollowing}
        </div>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar','profilePage'], store)


    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData,
            query: context.query
        }
    }
})
export default Following;
