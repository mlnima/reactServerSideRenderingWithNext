import Link from "next/link";
import styled from "styled-components";
import React from "react";

let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const settings = () => {
    return (
        <StyledDiv id='settings'>
            <Link href={'/admin/settings/general'} className='settings-page-item green-action-btn-link'>
               General Setting
            </Link>
        </StyledDiv>
    );
};

export default settings;