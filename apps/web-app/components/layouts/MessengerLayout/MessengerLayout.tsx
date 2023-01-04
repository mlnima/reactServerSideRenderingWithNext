import MessengerLayoutInitializer from "./MessengerLayoutInitializer";
import {FC} from "react";

interface PropTypes {
    children:any,
    rest?:any
}

const MessengerLayout:FC<PropTypes> = ({children}) => {

    return (

        <div className='MessengerLayout'>
            <MessengerLayoutInitializer children={children}/>
        </div>

    );
};

export default MessengerLayout;
