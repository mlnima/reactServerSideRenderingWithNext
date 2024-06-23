import React, {FC} from "react";
import styled, {keyframes} from "styled-components";


const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--primary-active-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

interface PropTypes {
}

const Spinner: FC<PropTypes> = ({}) => {
    return <SpinnerDiv/>
};
export default Spinner;
