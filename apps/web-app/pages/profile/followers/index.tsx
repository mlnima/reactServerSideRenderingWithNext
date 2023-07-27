import React, {useEffect, useState} from 'react';
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {wrapper} from "@store_toolkit/store";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {getMultipleUserDataByIdAction} from "@store_toolkit/clientReducers/userReducers/getMultipleUserDataByIdAction";
import {getSpecificUserDataAction} from "@store_toolkit/clientReducers/userReducers/getSpecificUserDataAction";

const FollowersStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Followers = () => {
    const userData = useAppSelector((state) => state?.user?.userData)
    const dispatch = useAppDispatch()
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserDataAction({fields: ['followers']}))
    }, []);

    useEffect(() => {
        if (userData?.followers?.length) {
            dispatch(getMultipleUserDataByIdAction({usersList: userData?.followers, type: 'followers'}))
        }
    }, [userData?.followers]);


    const renderFollowers = followers.map((user, index) => {
        return (
            <UserSmallPreview key={index} user={user}/>
        )
    })

    return (
        <FollowersStyledDiv className='my-profile-followers-list main'>
            <HeadSetter title={'Followers'}/>
            {renderFollowers}
        </FollowersStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ],
        {
            setHeadData: true,
            page: 'followersPage'
        }, store)

    return {
        props: {}
    }
})

export default Followers;
