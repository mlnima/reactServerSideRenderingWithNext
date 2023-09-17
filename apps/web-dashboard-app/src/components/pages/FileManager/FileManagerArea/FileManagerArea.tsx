import React,{FC,Fragment} from 'react';
import styled from "styled-components";
import {fileTypeDetector} from "custom-util";
import {useSelector} from "react-redux";
import {DashboardStore, Store} from "typescript-types";
import {fileManagerEditState, uploadFileAction} from "@store/reducers/fileManagerReducer";
import {useAppDispatch} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-solid-svg-icons/faFile";
import {faSliders} from "@fortawesome/free-solid-svg-icons/faSliders";
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder";
import {faSass} from "@fortawesome/free-brands-svg-icons/faSass";
import {faCss3} from "@fortawesome/free-brands-svg-icons/faCss3";
import {faFilePdf} from "@fortawesome/free-solid-svg-icons";

const FileManagerAreaStyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 10px;
  background-color: var(--secondary-background-color,#181818);
  padding: 20px 20px 200px 20px;
  border-radius: 20px;

  .dirItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .file-manager-image-item {
      width: 80px;
      object-fit: cover;
    }

    button {
      width: 80px;
      height: 80px;
      background-color: rgba(255, 255, 255, .1);
      outline: none;
      transition: .4s;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        transform: scale(1.2);
      }

      .file-manager-icons {
        color: white;
        width: 50px;
        height: 50px;
      }
    }

    p {
      font-size: small;
      overflow: hidden;
      color: white;
      text-align: center;
    }
  }

`


const FileManagerArea: FC = () => {
    const dispatch = useAppDispatch()
    const fileManagerData = useSelector(({fileManager}: DashboardStore) => fileManager)


    const IconToRender = (data:any) => {
        const itemType = fileTypeDetector(data.fileName)
        if (itemType === 'image') {
            return (
                <Fragment>
                    <img className='file-manager-image-item'
                         src={fileManagerData.path.replace('.', '') + '/' + data.fileName}
                    />
                </Fragment>

            )
        } else if (itemType === 'video') {
            return (
                <video className='file-manager-image-item'>
                    <source src={fileManagerData.path.replace('.', '') + '/' + data.fileName}/>
                </video>
            )
        } else {
            const logoToRender = `/asset/images/icons/${data.fileName.includes('.js') ? faFile :
                data.fileName.includes('.env') ? faSliders :
                    !data.fileName.includes('.') ? faFolder :
                        data.fileName.includes('.scss') ? faSass :
                        data.fileName.includes('.pdf') ? faFilePdf :
                            data.fileName.includes('.css') ? faCss3 :
                                faFile
            }`
            const logoColorToRender = data.fileName.includes('.js') ? '#efd81d' :
                data.fileName.includes('.env') ? 'red' :
                    !data.fileName.includes('.') ? '#ffe8a0' :
                        data.fileName.includes('.scss') ? 'red' :
                            data.fileName.includes('.css') ? 'blue' :
                                'white'

            return (
                <Fragment>
                    <button key={data.fileName} name={data.fileName}>
                        <FontAwesomeIcon icon={logoToRender as any} color={logoColorToRender} className={'meta-icon'}/>
                    </button>
                </Fragment>
            )
        }
    }

    const onClickHandler = (item:any) => {
        let itemPath = fileManagerData.path === './' ? './' + item : fileManagerData.path + '/' + item

        dispatch(fileManagerEditState({
            prevPath: fileManagerData.path,
            path: itemPath,
            clickedItemName: item
        }))
    };


    let renderDir = fileManagerData.files.map(item => {
        console.log('item=> ',item)
        return (
            <div key={item} className='dirItem' onClick={() => onClickHandler(item)}>
                <IconToRender fileName={item}/>
                <p> {item}</p>
            </div>
        )
    });

    const onDropFileHandler = (e:any) => {
        e.preventDefault()
        const fileData = e.dataTransfer.files[0]
        if (fileData) {
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)
            dispatch(uploadFileAction({file: filesData, useType: 'fileManagerFileUpload'}))
        }
    }


    return (
        <FileManagerAreaStyledDiv className='FileManagerArea' onDrop={e => onDropFileHandler(e)}
                                  onDragOver={e => e.preventDefault()}>

            {renderDir}
        </FileManagerAreaStyledDiv>
    );
};
export default FileManagerArea;

