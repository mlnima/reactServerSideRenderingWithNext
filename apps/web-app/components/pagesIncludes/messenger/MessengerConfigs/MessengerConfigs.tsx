import React, {FC} from "react";
import {useAppDispatch} from "@store_toolkit/hooks";
import {setMaximize} from "@store_toolkit/clientReducers/messengerReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinimize} from "@fortawesome/free-solid-svg-icons/faMinimize";
import {faMaximize} from "@fortawesome/free-solid-svg-icons/faMaximize";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {Styles} from "./MessengerConfigs.styles";

interface IButton {
    active?: boolean
}
interface PropTypes {
}


const StyledButton = styled.button<IButton>`
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({active}) => active ? 'var(--main-active-color, #f90)' : 'var(--secondary-text-color, #ccc)'};

  svg {
    width: 25px;
    height: 25px;
  }
`

const MessengerConfigs: FC<PropTypes> = () => {

    const dispatch = useAppDispatch();
    const {isMaximized} = useSelector(({messenger}: Store) => messenger);

    const onSetMaximizedHandler = () => {
        dispatch(setMaximize(null))
        localStorage.setItem('isMaximized', (!isMaximized).toString())
    }

    return (
        <Styles className={'messenger-configs'}>
            <h1> Messages</h1>
            <StyledButton active={isMaximized} className='chatroomTopBarActionButton'
                          onClick={onSetMaximizedHandler}>
                <FontAwesomeIcon icon={isMaximized ? faMinimize : faMaximize}/>
            </StyledButton>

        </Styles>
    )
};
export default MessengerConfigs
