import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign, faEuroSign} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const BottomLeftStyledSpan = styled.span`
  left: 3px;
  bottom: 43px;
`

const BottomLeft = props => {

    return (
        <BottomLeftStyledSpan className='bottom-left post-element-info-data'>
               {props.type === 'product' ?
                <>
                    <FontAwesomeIcon style={{width:'24px',height:'24px'}} icon={props?.state?.currency === 'Usd' ? faDollarSign : faEuroSign} className='post-element-info-logo' style={props.svgDefaultStyle}/>
                    <span className='value-next-icon'>{props.price}</span>
                </> : (props.type === 'video' && props.duration) || props.type === 'redirect' ?
                    <>
                        <span className='value-next-icon'>  {props.duration}</span>
                    </>
                    : null
            }

        </BottomLeftStyledSpan>
    )


};
export default BottomLeft;
