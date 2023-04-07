import React, { useEffect, useState} from 'react';
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {wrapper} from "@store_toolkit/store";
import { useSelector} from "react-redux";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {getMultipleUserDataByIdAction} from "@store_toolkit/clientReducers/userReducers/getMultipleUserDataByIdAction";
import {getSpecificUserDataAction} from "@store_toolkit/clientReducers/userReducers/getSpecificUserDataAction";

const FollowingStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Following  = ( ) => {
    const userData = useSelector((store: Store) => store?.user?.userData)
    const dispatch = useAppDispatch()
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserDataAction({fields:['following']}))
    }, []);


    useEffect(() => {
        if (userData?.following?.length) {
            dispatch(getMultipleUserDataByIdAction({usersList:userData?.followers, type:'following'}))
        }
    }, [userData?.following]);

    const renderFollowing = following.map((user, index) => {
        return (
            <UserSmallPreview key={index} user={user}/>
        )
    })


    return (
        <FollowingStyledDiv className='my-profile-following-list main'>
            <HeadSetter title={'Following'}/>
            {renderFollowing}
        </FollowingStyledDiv>
    );
};

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ],
        {
            setHeadData: true,
            page: 'followingPage'
        },store)

    return null
})

export default Following;
