import React, {useEffect, useState} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
// @ts-ignore
import _ from "lodash";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {getSpecificUserData} from "../../../store/actions/userActions";
import styled from "styled-components";
const FollowersStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Followers = ( ) => {
    const userData = useSelector((state : StoreTypes) => state?.user?.userData)
    const dispatch = useDispatch()
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserData(['followers']))
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (userData.followers?.length > 0) {
            getMultipleUserDataById(userData?.followers).then(res => {
                // @ts-ignore
                setFollowers(res?.data?.users || [])
            })
        }
    }, [userData?.followers]);

    const renderFollowers = followers.map((user,index) => {
        return (
            <UserSmallPreview key={index} {...user} />
        )
    })

    return (
        <FollowersStyledDiv className='my-profile-followers-list main'>
            {renderFollowers}
        </FollowersStyledDiv>
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
