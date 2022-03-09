import styled from "styled-components";

const CardViewsStyledDiv = styled.div`
  font-size: 12px;
  .icon {
    width: 14px;
    height: 14px;
    margin: 0 2px;
    background-color: var(--post-element-info-text-color, #ccc);
    //mask: url('/public/asset/images/icons/eye-regular.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/eye-regular.svg') no-repeat center;
  }
`

interface CardViewsPropTypes {
    views: number,
    className: string
}

const CardViews = ({views, className}: CardViewsPropTypes) => {
    return (
        <CardViewsStyledDiv className={'card-views ' + className}>
            <span>{views}</span>
            <span className={'icon'}/>
        </CardViewsStyledDiv>
    );
};
export default CardViews;