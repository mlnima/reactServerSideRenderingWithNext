import React, {FC} from "react";
import styled from "styled-components";
import {capitalizeFirstLetter} from "custom-util";

const Style = styled.div``;

interface PropTypes {
    profileImage: string,
    username: string,
    callType: string | null,
}

const CallerInfo: FC<PropTypes> = ({profileImage, username, callType}) => {
    return (
        <Style className={'caller-info'}>
            {profileImage && <img alt={'caller profile image'} src={profileImage}/>}
            <div className={'caller-detail'}>
                <h2>Incoming {capitalizeFirstLetter(callType)} Call</h2>
                <h3>{username}</h3>
            </div>
        </Style>
    )
};
export default CallerInfo; 