import  { useEffect, useState} from 'react';
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {wrapper} from "../../../store_toolkit/store";
import { useSelector} from "react-redux";
import styled from "styled-components";
import {fetchMultipleUserDataById, fetchSpecificUserData} from "../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../store_toolkit/hooks";
import _getServerSideStaticPageData from "../../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";

const FollowingStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Following  = ( ) => {
    const userData = useSelector((store: Store) => store?.user?.userData)
    const dispatch = useAppDispatch()
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        dispatch(fetchSpecificUserData({fields:['following']}))
    }, []);


    useEffect(() => {
        if (userData?.following?.length) {
            dispatch(fetchMultipleUserDataById({usersList:userData?.followers, type:'following'}))
        }
    }, [userData?.following]);

    const renderFollowing = following.map((user, index) => {
        return (
            <UserSmallPreview key={index}
                             //@ts-ignore
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

//@ts-ignore
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

export default Following;
