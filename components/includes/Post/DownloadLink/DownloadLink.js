import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
let StyledDiv = styled.div`${props => props.stylesData}`;

const DownloadLink = props => {
    if (props.render) {
        return (
            <StyledDiv  className='download-url action-wide-button'>
                <a  href={ props.downloadLink } target='_blank' className='download-link' rel="noreferrer"><FontAwesomeIcon style={props.svgDefaultStyle} icon={faDownload} className='svg-logo-medium'/></a>
            </StyledDiv>

        );
    } else return null

};
export default DownloadLink;