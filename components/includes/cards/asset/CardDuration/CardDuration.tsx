import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-regular-svg-icons";
const CardViewsStyledDiv = styled.div`
  font-size: 12px;
  .icon{
    width: 14px;
    height: 14px;
    margin: 0 2px;
  }
`
interface CardViewsPropTypes {
    duration:string,
    className:string
}

const CardDuration = ({duration,className}:CardViewsPropTypes) => {
    return (
        <CardViewsStyledDiv className={'card-duration '+className}>
            {duration}
        </CardViewsStyledDiv>
    );
};
export default CardDuration;
