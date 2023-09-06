import {FC} from "react";

interface PropTypes {
    username:string
}

const SomeoneIsTyping: FC<PropTypes> = ({username}) => {
    return (
        <span className={'chatroom-someone-typing'}>
            {username} is typing
        </span>
    )
};
export default SomeoneIsTyping;
