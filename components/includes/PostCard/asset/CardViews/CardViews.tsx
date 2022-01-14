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
            {/*<FontAwesomeIcon icon={faEye} className={'icon'}/>*/}
            <svg className={'icon'}
                 xmlns={'http://www.w3.org/2000/svg'}
                 width={'14'}
                 height={'14'}
                 viewBox={'0 0 24 24'}
                 fill={'none'}
                 stroke={'currentColor'}
                 strokeWidth={'2'}
                 strokeLinecap={'round'}
                 strokeLinejoin={'round'} >
                <path d={'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'}/>
                <circle cx={'12'} cy={'12'} r={'3'}/>
            </svg>
        </CardViewsStyledDiv>
    );
};
export default CardViews;
