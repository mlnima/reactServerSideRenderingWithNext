import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getUserPreviewData} from "../../_variables/_userSocialAjaxVariables";
import UserPageCoverImage from "../../components/includes/userPageComponents/UserPageCoverImage/UserPageCoverImage";
import UserPageActionButtons from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";
import {useRouter} from "next/router";

const user = props => {
    const router = useRouter()
    const [state, setState] = useState({});
    useEffect(() => {
        console.log(router)
    }, [router]);

    return (
        <div className='user-page main'>
            <style jsx>{`
                .user-page{
                 color:var(--main-text-color);
                }
            `}</style>
            <UserPageCoverImage
                coverImage={props?.userData?.coverImage}
                profileImage={props?.userData?.profileImage}
            />
            <UserPageActionButtons
                _id={props?.userData?._id}
            />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['userPageRightSidebar,userPageLeftSidebar', 'userPage'], 'userPage')
    const userPreviewData = await getUserPreviewData(firstLoadData.domainName, context.query.username)
    const userData = userPreviewData.data.userData
    const widgets = firstLoadData.widgets
    return {
        props: {
            widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query,
            userData: userData || null
        }
    }
}


export default user;
