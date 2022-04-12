import React, {FC, useEffect, useState} from 'react';
// import {getMultipleUserDataById} from "@_variables/_userSocialAjaxVariables";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getMultipleUserDataById, getSpecificUserData} from "@store/clientActions/userActions";
import styled from "styled-components";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

const FollowersStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Followers: FC = () => {
    const userData = useSelector((state: StoreTypes) => state?.user?.userData)
    const dispatch = useDispatch()
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserData(['followers']))
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (userData.followers?.length) {
            dispatch(getMultipleUserDataById(userData?.followers, 'followers'))
            // getMultipleUserDataById(userData?.followers).then(res => {
            //     // @ts-ignore
            //     setFollowers(res?.data?.users || [])
            // })
        }
    }, [userData?.followers]);



    const renderFollowers = followers.map((user, index) => {
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

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profilePage'
        ]))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})
export default Followers;
