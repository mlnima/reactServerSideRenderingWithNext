import {Link} from 'react-router-dom'
import styled from "styled-components";
import React from "react";

let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Settings = () => {
    return (
        <StyledDiv id='settings'>
            <Link to={'/admin/settings/general'} className='settings-page-item green-action-btn-link'>
                General Setting
            </Link>
        </StyledDiv>
    );
};

export default Settings;