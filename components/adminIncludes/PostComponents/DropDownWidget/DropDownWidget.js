import React, { useEffect, useState } from 'react';
import FA from "react-fontawesome";
import styled from "styled-components";
let StyledDiv = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  padding: 10px;
  .DropDownWidgetHead {
    border-radius: 5px;
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;
    margin-bottom: 1px;
    border-bottom: 1px solid #eee !important;
    background-color: $light100;
    .DropDownWidgetHeadTitle {

    }

    .DropDownWidgetHeadOpenCloseBtn {
      @include transparentLightTextBtn;
      color: black;


      .fontawesomeMedium {
        font-size: large;
        height: 10px;
      }

    }
  }
`

const DropDownWidget = props => {

    const [ state, setState ] = useState({
        open: true,
        icon: 'sort-up'
    });
    useEffect(() => {
        state.open ?
            setState({
                ...state,
                icon: 'sort-up'
            }) :
            setState({
                ...state,
                icon: 'sort-down'
            })
    }, [ state.open ]);

    const openCloseHandler = () => {
        state.open ?
            setState({
                ...state,
                open: false
            }) :
            setState({
                ...state,
                open: true
            })
    };
    const RenderTheComponent = () => {
        if (state.open) {
            return <props.component { ...props }/>
        } else return null
    };

    if (props.postData.postType !== 'video' && props.type === 'actors') {
        return null
    } else if (props.postData.postType === props.renderFor || props.renderFor === 'all') {
        return (
            <StyledDiv className='DropDownWidget'>
                <div className="DropDownWidgetHead">
                    <p className='DropDownWidgetHeadTitle'>{ props.title }</p>
                    <button className='DropDownWidgetHeadOpenCloseBtn' onClick={ () => openCloseHandler() }><FA className='fontawesomeMedium' name={ state.icon }/></button>
                </div>
                <div className="DropDownWidgetComponent">
                    <RenderTheComponent/>
                </div>
            </StyledDiv>
        );
    } else return null

};
export default DropDownWidget;