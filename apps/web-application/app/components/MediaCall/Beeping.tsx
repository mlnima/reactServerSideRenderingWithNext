import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import './Beeping.styles.scss'

interface PropTypes {
    outGoingCall: boolean;
    callAccepted: boolean;
}

const Beeping: FC<PropTypes> = ({ outGoingCall, callAccepted }) => {
    return (
        <div className={`beeping beeping${outGoingCall ? 'OutGoingCall': 'IncomingCall'}`}  >
            <FontAwesomeIcon className="icon" icon={faWifi} style={{width:130,height: 130}} />
        </div>
    );
};

export default Beeping;