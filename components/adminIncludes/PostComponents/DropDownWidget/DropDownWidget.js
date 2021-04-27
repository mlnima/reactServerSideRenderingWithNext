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
    background-color: white;
    .DropDownWidgetHeadTitle {

    }

    .DropDownWidgetHeadOpenCloseBtn {
       background-color: transparent;
          color: white;
          outline: none;
          border: none;
      


      .fontawesomeMedium {
        font-size: large;
        height: 10px;
      }

    }
  }
  .DropDownWidgetComponent,.admin-widget{
  padding:10px;
  width: 100%;
  display: grid;
  background-color: white;

  button{
    background-color: #f1f1f1;
    color: black;
    outline: none;
    border: .4px #9fa3a8 solid;
    padding: 8px 10px;
    border-radius: 5px;
    &:active{
      background-color: white;
      border:none;
    }
  }
}
  
`
//629
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