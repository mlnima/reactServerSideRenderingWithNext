import React, {FC} from "react";
import {capitalizeFirstLetter} from "shared-util";

interface PropTypes {
    profileImage: string,
    username: string,
    callType: string | null,
}

const CallerInfo: FC<PropTypes> = ({profileImage, username, callType}) => {
    return (
        <div className={'caller-info'}>
            {profileImage && <img alt={'caller profile image'} src={profileImage}/>}
            <div className={'caller-detail'}>
                <h2>Incoming {capitalizeFirstLetter(callType)} Call</h2>
                <h3>{username}</h3>
            </div>
        </div>
    )
};
export default CallerInfo; 