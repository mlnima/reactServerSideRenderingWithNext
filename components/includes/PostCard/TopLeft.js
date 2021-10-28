import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const TopLeftStyledSpan = styled.span`
  left: 3px;
  top: 3px;
`


const TopLeft = props => {
    return (
        <TopLeftStyledSpan className='top-left post-element-info-data'>
            <span className='view-count value-next-icon'>%{props.rating}</span>
            <FontAwesomeIcon style={props.svgDefaultStyle} icon={faThumbsUp} className='post-element-info-logo'/>
        </TopLeftStyledSpan>
    );
};
export default TopLeft;
