import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const BottomRightStyledSpan = styled.span`
  position: absolute;
  right: 3px;
  bottom: 43px;
  margin: auto;
`
const BottomRight = props => {

    return (
        <BottomRightStyledSpan className='bottom-right post-element-info-data'>
                 <FontAwesomeIcon style={{width:'24px',height:'24px'}} icon={faEye} className='post-element-info-logo'/>
                 <span className='view-count value-next-icon'>{props.views}</span>
         </BottomRightStyledSpan>
    );
};
export default BottomRight;
