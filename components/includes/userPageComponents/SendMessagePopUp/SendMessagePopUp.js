import React, {useEffect, useState} from 'react';
import SendMessagePopUpHeader from "./SendMessagePopUpHeader";
import {sendMessage} from "../../../../_variables/_userSocialAjaxVariables";
import {useSelector} from "react-redux";

const SendMessagePopUp = props => {
    const userData = useSelector(state => state?.user.userData)
    const [state, setState] = useState({
        sender: userData._id,
        receiver: props.receiverId,
        message: ''
    });
    useEffect(() => {
    }, []);

    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSendMessageHandler = () =>{

        sendMessage(state.receiver,state.message).then(res=>{

        })
    }

    return (
        <div className='send-message-pop-up'>
<style jsx>{`
.send-message-pop-up{
//position: fixed;
// display: grid;
//place-items: center;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.5);
width: 100%;
height: 100%;
}
.send-message-pop-up-content{
position: absolute;
background-color: var(--navigation-background-color,#18181b);
color:var(-navigation-text-color);
width: 320px;
}
.send-message-pop-up-content-message-area{
min-height: 250px;
width: 100%;
}

@media only screen and (min-width: 768px){
.send-message-pop-up-content{
display: flex;
justify-content: center;
//align-items: center;
flex-direction: column;
width: 400px;
}
.send-message-pop-up-content-message-area{
background-color: var(--navigation-background-color,#18181b);
color:var(--navigation-text-color, #ccc);
width: 380px;

}
}
`}</style>
            <div className='send-message-pop-up-content'>
                <SendMessagePopUpHeader
                    receiverId={props?.receiverId}
                    receiverProfileImage={props?.receiverProfileImage}
                    username={props.username}
                    onCloseMessagePop={props.onCloseMessagePop}
                />
                <textarea className='send-message-pop-up-content-message-area' name="message"  onChange={e=>onChangeHandler(e)}/>
                <button onClick={onSendMessageHandler}>Send</button>
            </div>
        </div>
    );

};
export default SendMessagePopUp;
