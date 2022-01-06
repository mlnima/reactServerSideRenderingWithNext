import styled from "styled-components";

const CardQualityStyledDiv = styled.div`
  font-size: 12px;
  .icon{
    width: 12px;
    height: 12px;
    margin: 0 2px;
  }
`

interface CardViewsPropTypes {
    quality:string,
    className:string
}

const CardQuality = ({quality,className}:CardViewsPropTypes) => {
    return (
        <CardQualityStyledDiv className={'card-quality '+className}>
            {quality}
        </CardQualityStyledDiv>
    );
};
export default CardQuality;
