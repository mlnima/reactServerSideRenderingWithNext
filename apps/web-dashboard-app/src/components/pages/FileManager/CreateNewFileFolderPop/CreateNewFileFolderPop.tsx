import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch} from "@store/hooks";
import {createFileOrFolderAction} from "@store/reducers/fileManagerReducer";

const CreateNewFileFolderPopStyledDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;

  .create-new-file-folder-pop-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    width: 300px;
    height: 200px;
    padding: 10px;
    border-radius: 10px;
    border: .5px solid white;

    .create-new-file-folder-pop-content-title {
      color: white;
      align-self: flex-start;
    }

    .create-new-file-folder-pop-content-input {
      width: 95%;
    }

    .create-new-file-folder-pop-content-action-button {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;

      button {
        background-color: transparent;
        color: white;
        padding: 10px 20px;
        border: .5px solid white;
        border-radius: 5px;
      }
    }
  }
`

interface PropTypes{
    render:boolean,
    setState:Function,
    state:any
    createNewFileFolderPopType:any
}


const CreateNewFileFolderPop:FC<PropTypes> = props => {
    const [state, setState] = useState({
        type: 'file',
        fileFolderName:''
    });
    const [render, setRender] = useState(false);
    const dispatch = useAppDispatch()


    useEffect(() => {
        setRender(props.render)
    }, [props]);


    const onCancelHandler = () => {
        props.setState({
            //@ts-ignore
            ...props.state,
            createNewFileFolderPop: false
        })
    }
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const onSaveHandler = () => {
        if (props.state.path && state.fileFolderName) {
            const data = {
                Path: props.state.path,
                fileFolderName: state.fileFolderName,
                type:props.state.createNewFileFolderPopType
            }
            //@ts-ignore
            dispatch(createFileOrFolderAction(data))
            // _createFileOrFolder(data).then(() => setRender(false))
        }
    }

    if (render) {
        return (
            <CreateNewFileFolderPopStyledDiv className='create-new-file-folder-pop'>
                <div className='create-new-file-folder-pop-content'>
                    <p className='create-new-file-folder-pop-content-title'>Create New {props.state.createNewFileFolderPopType}</p>
                    <p className='create-new-file-folder-pop-content-title'>{props.state.createNewFileFolderPopType} Name :</p>
                    <input type="text" name='fileFolderName' onChange={e=>onChangeHandler(e)} value={state.fileFolderName} className='create-new-file-folder-pop-content-input'/>
                    <div className='create-new-file-folder-pop-content-action-button'>
                        <button onClick={onSaveHandler}>Save</button>
                        <button onClick={onCancelHandler}>Cancel</button>
                    </div>
                </div>
            </CreateNewFileFolderPopStyledDiv>
        );
    } else return null

};
export default CreateNewFileFolderPop;
