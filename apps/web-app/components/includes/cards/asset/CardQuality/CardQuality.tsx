import styled from "styled-components";

const CardQualityStyledDiv = styled.div`
  font-size: 12px;
  font-weight: bold;
`

interface CardViewsPropTypes {
    quality: string,
    className: string
}

const CardQuality = ({quality, className}: CardViewsPropTypes) => {
    return (
        <CardQualityStyledDiv className={'card-quality ' + className}>
            {quality}
        </CardQualityStyledDiv>
    );
};
export default CardQuality;
