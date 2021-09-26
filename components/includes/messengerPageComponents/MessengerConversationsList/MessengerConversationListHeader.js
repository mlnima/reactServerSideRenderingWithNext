import Authentication from "../../widgets/Authentication/Authentication";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

const MessengerConversationListHeader = () => {
    const router = useRouter()

    return (
        <div className='messenger-conversations-list-header'>
            <style jsx>{`
                .messenger-conversations-list-header{
                    background-color: var(--navigation-background-color,#18181b);
                    height: 50px;
                    padding:  10px;
                    width: 100%;
                    display:flex;
                    justify-content : center;
                    align-items:center;
                }
                .messenger-conversation-header-back-btn{
                    background-color: transparent;
                    border: none;
                    margin: 0 10px;
                }
            `}</style>
            {/*<button onClick={()=>router.back()} className='messenger-conversation-header-back-btn'>*/}
            {/*    <FontAwesomeIcon style={{width: '30px',height: '30px',color:'var(--navigation-text-color, #ccc)'}}  icon={faArrowLeft} className='messenger-conversation-header-back-btn-svg' />*/}
            {/*</button>*/}
            <Authentication/>
        </div>
    );
};
export default MessengerConversationListHeader;
