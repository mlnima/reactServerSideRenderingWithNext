import {FC} from "react";

interface PropTypes {
    username:string
}

const SomeoneIsTyping: FC<PropTypes> = ({username}) => {
    return (
        <span id={'someoneIsTyping'}>
            {username} is typing
        </span>
    )
};
export default SomeoneIsTyping;
