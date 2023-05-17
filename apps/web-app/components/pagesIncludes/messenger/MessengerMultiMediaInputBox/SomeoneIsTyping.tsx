import {FC} from "react";
import Style from "./SomeoneIsTyping.styles";

interface PropTypes {
    username
}

const SomeoneIsTyping: FC<PropTypes> = ({username}) => {
    return (
        <Style className={'chatroom-someone-typing'}>
            {username} is typing
        </Style>
    )
};
export default SomeoneIsTyping;
