import styled from "styled-components";

const CardQualityStyledDiv = styled.div`
  font-size: 12px;
`

interface CardViewsPropTypes {
    quality:string,
    className:string
}

const CardQuality = ({quality,className}:CardViewsPropTypes) => {
    return (
        <CardQualityStyledDiv className={'card-quality '+className}>
            {quality.toUpperCase()}
        </CardQualityStyledDiv>
    );
};
export default CardQuality;
