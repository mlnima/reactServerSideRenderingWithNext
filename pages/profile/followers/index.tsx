import { useEffect, useState} from 'react';
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import { useSelector} from "react-redux";
import styled from "styled-components";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";
import {fetchMultipleUserDataById, fetchSpecificUserData} from "@store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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
        // @ts-ignore
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
            'profilePage'
        ])

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

Followers.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default Followers;
