import { FC } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

interface PropTypes {
    outGoingCall: boolean;
    callAccepted: boolean;
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Style = styled.div<PropTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .icon {
    color: #4caf50;
    animation: ${pulseAnimation} 2s infinite;
    opacity: ${({ outGoingCall, callAccepted }) =>
            outGoingCall && !callAccepted ? .5 : 0};
    transition: opacity 0.5s;
    position: relative;
  }

`;

const Beeping: FC<PropTypes> = ({ outGoingCall, callAccepted }) => {
    return (
        <Style outGoingCall={outGoingCall} callAccepted={callAccepted}>
            <FontAwesomeIcon className="icon" icon={faWifi} style={{width:130,height: 130}} />
        </Style>
    );
};

export default Beeping;