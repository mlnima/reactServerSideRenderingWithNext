import React, {useRef} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {editDesign} from "../../../../store/actions/settingsActions";
import MonacoEditor from "../../MonacoEditor/MonacoEditor";

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
    const dispatch = useDispatch()
    const design = useSelector(store => store?.settings.design)

    const onChangeHandler = (event) => {
        if (typeof event === 'string') {
            const e = {
                target: {
                    value: event,
                    name: props.name
                }
            }
            dispatch(editDesign(e))
        } else if (typeof event === 'object') {
            dispatch(editDesign(event))
        }
    }

    return (
        <StyleSectionStyledDiv className='style-section'>
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
            <SaveDesignChangesBtn reload={false} />
        </StyleSectionStyledDiv>
    );
};
export default StyleSection;
