import React, {useRef} from 'react';
import SaveDesignChangesBtn from "../SaveDesignChangesBtn";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import TextEditors from "../../TextEditors/TextEditors";
import {editDesign} from "../../../../store/actions/settingsActions";

const StyleSectionStyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .style-section-editor{
    width: 100%;
    .text-editors{
      width: 100%;
      .ql-container{
        width: 100%;
        height: 70vh;
      }
    }
  }
  .btn-primary{
    margin: 20px;
  }
`

const StyleSection = props => {
    const editorRef = useRef(null);
    const dispatch = useDispatch()
    const design = useSelector(store => store?.settings.design)

    const onChangeHandler = (event) => {

        if (typeof event === 'string'){
            const e = {
                target:{
                    value:event,
                    name: props.name
                }
            }
            dispatch(editDesign(e))
        }else if (typeof event === 'object') {
            dispatch(editDesign(event))
        }
    }

    return (
        <StyleSectionStyledDiv className='style-section'>
            <h1>{props.title}</h1>
            <div className='style-section-editor'>
                <TextEditors title={props.title}
                             value={design?.[props.name]}
                             onChangeHandler={onChangeHandler}
                             height={'70vh'}
                             use={['Monaco']}
                             openWith={'Monaco'}
                             width={'100%'}
                             language={'scss'}
                             name={props.name}
                />
            </div>
            <SaveDesignChangesBtn reload={true}
                                  editorRef={editorRef}
                                  name={props.name}
                                  onChangeHandler={onChangeHandler}

            />
        </StyleSectionStyledDiv>
    );
};
export default StyleSection;
