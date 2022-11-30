import { useEffect, useState} from 'react';
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {wrapper} from "../../../store_toolkit/store";
import { useSelector} from "react-redux";
import styled from "styled-components";
import {fetchMultipleUserDataById, fetchSpecificUserData} from "../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../store_toolkit/hooks";
import _getServerSideStaticPageData from "../../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";

const FollowersStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Followers = () => {
    const userData = useSelector((state: Store) => state?.user?.userData)
    const dispatch = useAppDispatch()
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        dispatch(fetchSpecificUserData({fields:['followers']}))
    }, []);

    useEffect(() => {

        if (userData.followers?.length) {
            dispatch(fetchMultipleUserDataById({usersList:userData?.followers, type:'followers'}))

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
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ])

    return null
})

export default Followers;
