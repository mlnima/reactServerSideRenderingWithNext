import React, {useEffect, useState} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import {getMultipleUserDataById} from "../../../_variables/_userSocialAjaxVariables";
import UserSmallPreview from "../../../components/includes/socialComponents/UserSmallPreview/UserSmallPreview";
// @ts-ignore
import _ from "lodash";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {getSpecificUserData} from "../../../store/actions/userActions";

import styled from "styled-components";

const FollowingStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;
`
const Following = (props: ClientPagesTypes) => {
    const userData = useSelector((state: StoreTypes) => state?.user?.userData)
    const dispatch = useDispatch()
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        dispatch(getSpecificUserData(['following']))
    }, []);


    useEffect(() => {
        // @ts-ignore
        if (userData?.following?.length > 0) {
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
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], store)


    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query
        }
    }
})
export default Following;
