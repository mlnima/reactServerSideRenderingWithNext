import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons";
const CardViewsStyledDiv = styled.div`
  font-size: 12px;
  .icon{
    width: 14px;
    height: 14px;
    margin: 0 2px;
  }
`
interface CardViewsPropTypes {
    views:number,
    className:string
}

const CardViews = ({views,className}:CardViewsPropTypes) => {
    return (
        <CardViewsStyledDiv className={'card-views '+className}>
            <span>{views}</span>
            <FontAwesomeIcon icon={faEye} className={'icon'}/>
        </CardViewsStyledDiv>
    );
};
export default CardViews;
