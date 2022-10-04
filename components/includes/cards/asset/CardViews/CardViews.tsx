import styled from "styled-components";

const CardViewsStyledDiv = styled.div`
  font-size: 12px;

  .icon {
    width: 14px;
    height: 14px;
    margin: 0 2px;
    background-color: var(--post-element-text-color, #ccc);
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
            {!!views &&
                <>
                    <span className={'icon'}/>
                    <span>{views}</span>
                </>
            }
        </CardViewsStyledDiv>
    );
};
export default CardViews;
