import styled from "styled-components";

const CardDurationStyledDiv = styled.div`
  font-size: 12px;
  font-style: normal;

`

interface CardViewsPropTypes {
    duration: string,
    className: string
}

const CardDuration = ({duration, className}: CardViewsPropTypes) => {
    return (
        <CardDurationStyledDiv className={'card-duration ' + className}>
            {duration}
        </CardDurationStyledDiv>
    );
};
export default CardDuration;
