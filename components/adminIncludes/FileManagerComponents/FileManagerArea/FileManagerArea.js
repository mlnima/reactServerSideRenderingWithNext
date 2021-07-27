import React, {  useContext } from 'react';
import { clickPathGenerator } from '../../../../_variables/_variables';
import { AppContext } from '../../../../context/AppContext'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import withRouter from 'next/dist/client/with-router'
import { fileTypeDetector } from '../../../../_variables/_variables'
import { faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {faCss3Alt, faJs, faSass,fas} from "@fortawesome/free-brands-svg-icons";
import {faFile, faFolder} from "@fortawesome/free-regular-svg-icons";

const FileManagerArea = props => {

    const classGenerator = fileName => {
        let nextClass = '';
        if (props.data.clickedItem === clickPathGenerator(fileName, props.state.path)) {
            nextClass = ' clickedItem'
        } else {
            nextClass = ' unClickedItem'
        }
    };


    const WhatToRender = data => {
        const itemType = fileTypeDetector(data.fileName)
        if (itemType === 'image') {
            return (
                <React.Fragment>
                <style jsx>{`
                    .file-manager-image-item {
                        width: 80px;
                        object-fit: cover;
                    }
                `}</style>
                    <img className='file-manager-image-item' src={ props.state.path.replace('.', '') + '/' + data.fileName }/>
                </React.Fragment>

            )
        } else if (itemType === 'video'){
            return (
                <video className='file-manager-image-item'>
                    <source src={ props.state.path.replace('.', '') + '/' + data.fileName }/>
                </video>
            )
        } else {
            const logoToRender = data.fileName.includes('.js') ? faJs :
                data.fileName.includes('.env') ? faSlidersH :
                    !data.fileName.includes('.') ? faFolder :
                        data.fileName.includes('.scss') ? faSass :
                            data.fileName.includes('.css') ? faCss3Alt :
                                faFile
            const logoColorToRender = data.fileName.includes('.js') ? '#efd81d' :
                data.fileName.includes('.env') ? 'red' :
                    !data.fileName.includes('.') ? '#ffe8a0' :
                        data.fileName.includes('.scss') ? 'red' :
                            data.fileName.includes('.css') ? 'blue' :
                                'white'
            return (
                <React.Fragment>
                <button className={ [ classGenerator(data.fileName) ] } key={ data.fileName } name={ data.fileName }  >
                <style jsx>{`
                    button {
                        width: 80px;
                        height: 80px;
                        background-color: rgba(255,255,255,.1);
                        border: none;
                        outline: none;
                       // font-size: xxx-large;
                        transition: .4s;
                        border-radius: 10px;
                    }
                    button:hover {
                        transform: scale(1.2);
                    }
                    .file-manager-icons{
                      color:white;
                    }
                `}</style>
                    <FontAwesomeIcon style={{width:'50px',height:'50px',color:logoColorToRender}}
                                     icon={logoToRender}
                                     //icon={['fas', 'coffee']}
                                     className='file-manager-icons'/>
                </button>
                </React.Fragment>
            )
        }
    }

    const onClickHandler = item => {
        let itemPath = clickPathGenerator(item, props.state.path);
        props.setState({
            ...props.state,
            prevPath:props.state.path,
            path:itemPath,
            clickedItemName:item
        })
    };


    let renderDir = props.state.files.map(item => {
        return (
            <div key={ item } className='dirItem' onClick={()=>onClickHandler(item)}>
            <style jsx>{`
                .dirItem{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                p {
                    font-size: small;
                    overflow: hidden;
                    color:white;
                    text-align: center;
                }
            `}</style>
                <WhatToRender key={item} fileName={ item }/>
                <p> { item }</p>
            </div>
        )
    });

    return (
        <div className='FileManagerArea'>
        <style jsx>{`
            .FileManagerArea{
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                grid-gap: 10px;
                background-color: black;
                padding: 20px 20px 200px 20px;
                border-radius: 20px;
               // min-height: 400px;
            }
        `}</style>
            { renderDir }
        </div>
    );
};
export default withRouter(FileManagerArea);

