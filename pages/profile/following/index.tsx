import React, {FC, useEffect, useState} from 'react';
import {getMultipleUserDataById} from "@_variables/_userSocialAjaxVariables";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getSpecificUserData} from "@store/clientActions/userActions";

import styled from "styled-components";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

const FollowingStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Following : FC = ( ) => {
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)
    const dispatch = useDispatch()
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserData(['following']))
    }, []);


    useEffect(() => {
        if (userData?.following?.length) {
            getMultipleUserDataById(userData?.following).then(res => {
                // @ts-ignore
                setFollowing(res?.data?.users || [])
            })
        }
    }, [userData?.following]);

    const renderFollowing = following.map((user, index) => {
        return (
            <UserSmallPreview key={index}
                              {...user}

            />
        )
    })


    return (
        <FollowingStyledDiv className='my-profile-following-list main'>
            {renderFollowing}
        </FollowingStyledDiv>
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
export default Following;
