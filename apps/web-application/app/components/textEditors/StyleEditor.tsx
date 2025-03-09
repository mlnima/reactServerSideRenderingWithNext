import React, {FC} from 'react';
import styled from "styled-components";
import { useSelector} from "react-redux";
import MonacoEditor from "./MonacoEditor";
import {DashboardStore, Store} from "@repo/typescript-types";
import {useAppDispatch} from "@storeDashboard/hooks";
import {editDesign,updateSettingAction} from "@storeDashboard/reducers/settingsReducer";

const StyleSectionStyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: auto;


  .style-section-editor {
    width: 100%;

    .text-editors {
      width: 100%;

      .ql-container {
        width: 100%;
        height: 80vh;
      }
    }
  }

  .save-button {
    margin-top: 20px;
    align-self: flex-start;
  }
`
interface PropTypes{
    name:string
    title:string
}
const StyleEditor:FC<PropTypes> = props => {
    const dispatch = useAppDispatch()
    const design = useSelector(({settings}: DashboardStore) => settings?.design)

    const onChangeHandler = (event:any) => {
        if (typeof event === 'string') {
            dispatch(editDesign({[props.name]: event}))
        }else{
            dispatch(editDesign({[event.target.name]: event.target.value}))
        }
    }

    const onSaveHandler = () => {
        dispatch(updateSettingAction({type:'design',data: design}))
    }

    return (
        <StyleSectionStyledDiv className='style-section'>
            {props.name === 'customStyles' ?
                <div className='style-section-editor'>
                    <p>Sidebar width:</p>
                    <input type={'number'}
                           name={'sideBarWidth'}
                           placeholder={'default value is 320px'}
                           value={design?.sideBarWidth || ''}
                           onChange={onChangeHandler}/>
                </div>
                : null
            }

            <h1>{props.title}</h1>

            <div className='style-section-editor'>

                <MonacoEditor
                    language={'scss'}
                    name={props.name}
                    //@ts-ignore
                    defaultValue={design?.[props.name]}
                    //@ts-ignore
                    value={design?.[props.name]}
                    className={'style-section-editor'}
                    onChange={onChangeHandler}
                    height={'80vh'}

                />
            </div>
            <button className={'btn btn-primary save-button'} onClick={onSaveHandler}>
                Save Changes
            </button>

        </StyleSectionStyledDiv>
    );
};
export default StyleEditor;
