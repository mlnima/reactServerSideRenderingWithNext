import  {FC,Fragment} from 'react';
import styled from "styled-components";
import {fileTypeDetector} from "custom-util";
import {useSelector} from "react-redux";
import {
    adminPanelFileManagerEditState,
    fetchFileManagerUploadFile
} from "../../../../store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {useAdminDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "typescript-types";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";

const FileManagerAreaStyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 10px;
  background-color: black;
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
    const dispatch = useAdminDispatch()
    const fileManagerData = useSelector(({adminPanelFileManager}: Store) => adminPanelFileManager)


    const WhatToRender = data => {
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
            const logoToRender = `/asset/images/icons/${data.fileName.includes('.js') ? 'js-.svg' :
                data.fileName.includes('.env') ? 'sliders-solid.svg' :
                    !data.fileName.includes('.') ? 'folder-solid.svg' :
                        data.fileName.includes('.scss') ? 'sass-.svg' :
                            data.fileName.includes('.css') ? 'css3-alt-.svg' :
                                'file-solid.svg'
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
                        <SvgRenderer svgUrl={logoToRender}
                                     size={25}
                                     customClassName={'file-manager-icons'}
                                     color={logoColorToRender}/>
                    </button>
                </Fragment>
            )
        }
    }

    const onClickHandler = item => {
        let itemPath = fileManagerData.path === './' ? './' + item : fileManagerData.path + '/' + item

        dispatch(adminPanelFileManagerEditState({
            prevPath: fileManagerData.path,
            path: itemPath,
            clickedItemName: item
        }))
    };


    let renderDir = fileManagerData.files.map(item => {
        return (
            <div key={item} className='dirItem' onClick={() => onClickHandler(item)}>
                <WhatToRender key={item} fileName={item}/>
                <p> {item}</p>
            </div>
        )
    });

    const onDropFileHandler = (e) => {
        e.preventDefault()
        const fileData = e.dataTransfer.files[0]
        if (fileData) {
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)

            dispatch(fetchFileManagerUploadFile({file: filesData, useType: 'fileManagerFileUpload', postData: null}))
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

