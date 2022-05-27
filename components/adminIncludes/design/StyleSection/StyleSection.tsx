import React from 'react';
import styled from "styled-components";
import { useSelector} from "react-redux";
import MonacoEditor from "../../MonacoEditor/MonacoEditor";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminEditDesign, adminPanelUpdateSetting} from "@store_toolkit/adminReducers/adminPanelSettingsReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";

const StyleSectionStyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .style-section-editor {
    width: 100%;

    .text-editors {
      width: 100%;

      .ql-container {
        width: 100%;
        height: 70vh;
      }
    }
  }

  .btn-primary {
    margin: 20px;
  }
`

const StyleSection = props => {
    const dispatch = useAdminDispatch()
    const design = useSelector(({adminPanelSettings}: StoreTypes) => adminPanelSettings?.design)

    const onChangeHandler = (event) => {
        if (typeof event === 'string') {
            dispatch(adminEditDesign({[props.name]: event}))
        }else{
            dispatch(adminEditDesign({[event.target.name]: event.target.value}))
        }
    }

    const onSaveHandler = () => {
        dispatch(adminPanelUpdateSetting({type:'design',data: design}))
    }

    return (
        <StyleSectionStyledDiv className='style-section'>
            {props.name === 'customStyles' ?
                <div className='style-section-editor'>
                    <p>Sidebar width:</p>
                    <input type={'number'} name={'sideBarWidth'} placeholder={'default value is 320px'}
                           value={design?.sideBarWidth || ''} onChange={onChangeHandler}/>
                </div>
                : null
            }
            <h1>{props.title}</h1>
            <div className='style-section-editor'>
                <MonacoEditor
                    language={'scss'}
                    name={props.name}
                    defaultValue={design?.[props.name]}
                    value={design?.[props.name]}
                    className={'style-section-editor'}
                    onChange={onChangeHandler}
                    height={'70vh'}
                />
            </div>
            <button className={'btn btn-primary'} onClick={onSaveHandler}>
                Save Changes
            </button>

        </StyleSectionStyledDiv>
    );
};
export default StyleSection;
