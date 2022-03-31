import styled from "styled-components";

const CardDurationStyledDiv = styled.div`
  font-size: 12px;
  var {
    font-style: normal;
  }
`

interface CardViewsPropTypes {
    duration: string,
    className: string
}

const CardDuration = ({duration, className}: CardViewsPropTypes) => {
    return (
        <CardDurationStyledDiv className={'card-duration ' + className}>
            <var>  {duration}</var>
        </CardDurationStyledDiv>
    );
};
export default CardDuration;
