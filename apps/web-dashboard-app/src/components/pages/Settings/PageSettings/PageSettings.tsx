import React, {ChangeEvent, FC, useEffect, useState} from "react";
import styled from "styled-components";
import inputValueSimplifier from "custom-util/src/inputsUtils/inputValueSimplifier";
import Editor from "@monaco-editor/react";
import {editPageFieldAction} from "@store/reducers/pagesReducer";

const Style = styled.form`

  @media only screen and (min-width: 768px) {
    max-width: 50vw;
  }
`;

interface PropTypes {
}

const PageSettings: FC<PropTypes> = ({}) => {
    const [openStyleEditor, setOpenStyleEditor] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        title: '',
        description: '',
        status: '',
        keywords: '',
        sidebar: false,
        customStyles: 'asdasd'
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setFieldsData(prevState => ({
            ...prevState,
            [e.target.name]: inputValueSimplifier(e)
        }))
    }

    const onStyleChangeHandler = (value: string) => {
        setFieldsData(prevState => ({
            ...prevState,
            customStyles: value
        }))
    }

    useEffect(() => {
        console.log(fieldsData)
    }, [fieldsData]);

    return (
        <Style className={'form-default'}>
            <div className="form-field">
                <p>Title:</p>
                <input className={'form-control-input'}
                       type="text" onChange={(e) => onChangeHandler(e)}
                       value={fieldsData.title}
                       name={'title'}
                       placeholder={'Title'}/>
            </div>
            <div className="form-field">
                <p>Description:</p>
                <textarea className={'form-control-input'}
                          onChange={(e) => onChangeHandler(e)}
                          value={fieldsData.description}
                          name={'description'}
                          placeholder={'Description'}/>
            </div>
            <div className="form-field">
                <p>Keywords:</p>
                <input className={'form-control-input'}
                       type="text" onChange={(e) => onChangeHandler(e)}
                       value={fieldsData.keywords}
                       name={'keywords'}
                       placeholder={'Keywords'}/>
            </div>
            <div className="form-field">
                {/*<button className={'btn btn-primary'} onClick={()=>setOpenStyleEditor(!openStyleEditor)}>Custom Styles:</button>*/}
                {/*{openStyleEditor &&                <Editor*/}
                {/*    language={'scss'}*/}
                {/*    width={'100%'}*/}
                {/*    height={'60vh'}*/}
                {/*    theme={'vs-dark'}*/}
                {/*    defaultValue={fieldsData?.customStyles || ''}*/}
                {/*    value={fieldsData?.customStyles || ''}*/}
                {/*    //@ts-ignore*/}
                {/*    onChange={onStyleChangeHandler}/>*/}
                {/*}*/}
                <Editor
                    language={'scss'}
                    width={'100%'}
                    height={'60vh'}
                    theme={'vs-dark'}
                    defaultValue={fieldsData?.customStyles || ''}
                    value={fieldsData?.customStyles || ''}
                    //@ts-ignore
                    onChange={onStyleChangeHandler}/>
            </div>
            <div className="form-field">
                <button className={'btn btn-primary'} type="submit">
                    Save
                </button>
            </div>


        </Style>
    )
};
export default PageSettings;