import styled from "styled-components";
let StyledDiv = styled.div`
  position: relative;
  height: 15px;
  .progressChild{
    height: 100%;
    position: absolute;
    font-size: x-small;
    display: flex;
    font-weight: bold;
    align-items: center;
    p{
      margin: 0 0 0 5px ;
      font-size: 12px;
    }
  }
`

const ProgressBar = props => {
    if (props.value < 1) {
        return (
            <StyledDiv  className='progressParent' style={{
                backgroundColor: props.backgroundColor,
                visibility:'hidden'
            }}>
            </StyledDiv>
        );
    } else return (
        <StyledDiv className='progressParent' style={{
            backgroundColor: props.backgroundColor
        }}>
            <span className="progressChild" style={{
                color: props.textColor,
                backgroundColor: props.valueColor,
                width: props.value + '%'
            }}> <p>{props.percent ? props.value + ' %' : ''}</p></span>
        </StyledDiv>
    )

};
export default ProgressBar;