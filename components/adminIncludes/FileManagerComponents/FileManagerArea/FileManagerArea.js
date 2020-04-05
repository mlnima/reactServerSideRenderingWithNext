import React, { useEffect, useState, useContext, useRef } from 'react';
import {clickPathGenerator} from '../../../../_variables/_variables';
import './FileManagerArea.scss';
import { AppContext } from '../../../../context/AppContext'
import BarsSvg from '../../../../static/images/fontawesome/bars-solid.svg'
import JsLogoSvg from '../../../../static/images/fontawesome/js-square-brands.svg'
import SliderSvg from '../../../../static/images/fontawesome/sliders-h-solid.svg'
import FolderSvg from '../../../../static/images/fontawesome/folder-solid.svg'
import SassSvg from '../../../../static/images/fontawesome/sass-brands.svg'
import FileSvg from '../../../../static/images/fontawesome/file-solid.svg'


const FileManagerArea = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    useEffect(() => {
        console.log(props)
    }, [ props ]);




    const classGenerator = fileName => {
        let nextClass = '';
        if (props.data.clickedItem === clickPathGenerator(fileName,props.data.path)) {
            nextClass = ' clickedItem'
        } else {
            nextClass = ' unClickedItem'
        }


    };

    const logoDetector = fileName =>{
        if (fileName.includes('.js')) {
            return JsLogoSvg
        } else if (fileName.includes('.env')) {
            return SliderSvg
        } else if (!fileName.includes('.')) {
            return FolderSvg
        } else if (fileName.includes('.scss')) {
            return SassSvg
        } else return FileSvg
    }







    const onClickHandler = e => {
        let clickedItem = props.data.clickedItem;
        let filePath = clickPathGenerator(e.currentTarget.name,props.data.path);
        if (props.data.clickedItem === filePath ){
            props.setStateHandler('clickedItem','')
        }else{
            props.setStateHandler('clickedItem',filePath)
            props.setStateHandler('path',filePath)
        }
    };



    let renderDir = props.data.files.map(item => {
        return (
            <div key={item} className='dirItem'>
               <button
                   // ref={() => selectedItem.current[props.data.files.indexOf(item)]}
                   className={[classGenerator(item)]} key={item} name={item} onClick={(e) => onClickHandler(e)}
                   // onDoubleClick={(e) => onDoubleClickHandler(e)}
                   // onContextMenu={(e) => onContextMenuHandler(e)}
               >
                   <img className='fontawesomeSvgLarge' src={ logoDetector(item) } alt=""/>
               </button>
                <p> {item}</p>
            </div>
        )
    });
    return (
        <div className='FileManagerArea'>
            {renderDir}
        </div>
    );
};
export default FileManagerArea;

// <buttonref={() => selectedItem.current[props.data.files.indexOf(item)]}
// className={[fileLogoDetector(item)]} key={item} name={item} onClick={(e) => onClickHandler(e)}
// onDoubleClick={(e) => onDoubleClickHandler(e)} onContextMenu={(e) => onContextMenuHandler(e)}/>