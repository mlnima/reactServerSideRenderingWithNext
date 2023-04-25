import {FC} from "react";
import {SomeoneIsTypingStyle} from "./Styles";

interface PropTypes {
    username
}

const SomeoneIsTyping: FC<PropTypes> = ({username}) => {
    return (
        <SomeoneIsTypingStyle className={'chatroom-someone-typing'}>
            {username} is typing
        </SomeoneIsTypingStyle>
    )
};
export default SomeoneIsTyping;
