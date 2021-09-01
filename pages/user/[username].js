import React, {useContext, useState, useEffect} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getUserPreviewData} from "../../_variables/_userSocialAjaxVariables";
import UserPageProfileImage from "../../components/includes/userPageComponents/UserPageProfileImage/UserPageProfileImage";
import UserPageActionButtons from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";

import SendMessagePopUp from "../../components/includes/userPageComponents/SendMessagePopUp/SendMessagePopUp";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const user = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        messagePop: false
    });

    const [userData, setUserData] = useState(()=>{ })




    const onCloseMessagePop = () => {
        setState({
            ...state,
            messagePop: false
        })
    }

    useEffect(() => {
        getUserData()
    }, [contextData.userData._id]);


    const getUserData = async () => {
        try {
            const userPreviewData = await getUserPreviewData( router.query.username,undefined,['following','followers','blockList']);
            const myFriendRequestData = await getUserPreviewData( undefined,contextData.userData._id,['following','followers','blockList']);
            contextData.dispatchUserData(userData=>({...userData,...myFriendRequestData.data.userData}))
            setUserData(userPreviewData.data.userData);

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='user-page main'>

            <style jsx>{`
                .user-page{
                    color:var(--main-text-color);
                }
                .main{
                    max-width: 940px;
                    margin: auto;
                }
                .profile-header{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 10px 0;
                    padding: 10px 0;
                    border-bottom:.5px solid var(--main-text-color) ;
                        .profile-header-info-actions{
                         display: flex;
                         justify-content: center;
                         align-items: center;
                         flex-direction: column;
                        }
                }
                .profile-posts{
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   flex-direction: column;
                   margin: 20px 0;
                    .profile-no-posts{
                       border: .5px solid var(--main-text-color);
                       border-radius: 50%;
                       width: 150px;
                       height:150px ;
                       display: flex;
                       justify-content: center;
                       align-items: center;
                       svg{
                           width:300px;
                           height:300px;
                       }
                    }
                    .profile-no-posts-title{
                     color: var(--main-text-color);
                    }
                }
            `}</style>

            <div className='profile-header'>
                <UserPageProfileImage
                    gender={userData?.gender}
                    profileImage={userData?.profileImage}
                />
                <div className='profile-header-info-actions'>
                    <h3>{userData?.username}</h3>
                    {contextData?.userData?.username !== userData?.username ?
                        <UserPageActionButtons
                            setParentState={setState}
                            username={userData?.username}
                            parentState={state}
                            _id={userData?._id}
                        /> : null
                    }
                </div>
            </div>
            <div className='profile-posts'>
                <div className='profile-no-posts'>
                    <FontAwesomeIcon style={{color:'var(--main-text-color)' }} className='upload-profile-image-btn-svg'  icon={faCamera} />
                </div>
                <h2 className='profile-no-posts-title'>No Post Yet </h2>
                <p className='profile-no-posts-title'> Coming Soon</p>
            </div>







        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['userPageRightSidebar,userPageLeftSidebar', 'userPage'], 'userPage')
    const widgets = firstLoadData.widgets
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query,
            // userData: userData || null
        }
    }
}


export default user;

// {
//     state.messagePop ?
//         <SendMessagePopUp
//             receiverId={userData?._id}
//             receiverProfileImage={userData?.profileImage}
//             username={userData?.username}
//             render={state.messagePop}
//             onCloseMessagePop={onCloseMessagePop}
//         /> : null
// }