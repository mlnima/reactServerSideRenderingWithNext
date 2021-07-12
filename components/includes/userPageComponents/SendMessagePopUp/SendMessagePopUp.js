import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../context/AppContext";
import SendMessagePopUpHeader from "./SendMessagePopUpHeader";

const SendMessagePopUp = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        sender: contextData.userData._id,
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

    const onSendMessageHandler = ()=>{

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
background-color: var(--navigation-background-color);
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
background-color: var(--navigation-background-color);
color:var(--navigation-text-color);
width: 380px;

}
}
`}</style>
            <div className='send-message-pop-up-content'>
                <SendMessagePopUpHeader
                    receiverId={props?.receiverId}
                    receiverProfileImage={props?.receiverProfileImage}
                    username={props.username}
                />
                <textarea className='send-message-pop-up-content-message-area' name="message"  onChange={e=>onChangeHandler(e)}/>
                <button>Send</button>
            </div>
        </div>
    );

};
export default SendMessagePopUp;
