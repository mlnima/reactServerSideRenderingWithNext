import  { useEffect, useState} from 'react';
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getMultipleUserDataById, getSpecificUserData} from "@store/clientActions/userActions";
import styled from "styled-components";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";

const FollowingStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Following  = ( ) => {
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)
    const dispatch = useDispatch()
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserData(['following']))
    }, []);


    useEffect(() => {
        if (userData?.following?.length) {
            dispatch(getMultipleUserDataById(userData?.followers,'following'))
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

Following.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default Following;
