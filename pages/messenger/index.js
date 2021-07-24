import React, {useEffect, useState, useContext, useRef} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getConversations} from "../../_variables/_userSocialAjaxVariables";
import {AppContext} from "../../context/AppContext";
import MessengerConversationsList from "../../components/includes/messengerPageComponents/MessengerConversationsList/MessengerConversationsList";
import {useRouter} from "next/router";
import Link from "next/link";


const messengerPage = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (contextData?.userData?._id) {
            getConversations(contextData?.userData?._id).then(res => {
                if (res.data.conversations) {
                    setConversations([...conversations, ...res.data.conversations])
                }
            }).catch(err => {
                console.log(err)
            })
        }

    }, [contextData?.userData]);


    if (contextData.userData._id){
        return (
            <div className='messenger-page main'>
                <MessengerConversationsList conversations={conversations} setConversations={setConversations}/>
            </div>
        );
    }else return (
        <div className='messenger-page main'>
        <style jsx>{`
            .messenger-page{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
            .messenger-page-register-page-link{
                color: var(--main-text-color);
            }
        
        `}</style>
           <Link href={'/register'}><a className='messenger-page-register-page-link'>You need to create an account in order to access this page</a></Link>
        </div>
    )

};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'messengerPage')
    const widgets = firstLoadData.widgets
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}

export default messengerPage;
