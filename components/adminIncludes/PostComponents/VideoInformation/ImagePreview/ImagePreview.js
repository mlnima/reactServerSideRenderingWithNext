import React,{useState} from 'react';
import Switch from "react-switch";
const ImagePreview = props => {

    const [state,setState]= useState({
        open:false
    })

    if (props.postData.mainThumbnail){

        if (state.open){
            return (
                <div className='ImagePreview VideoInformationSection'>
                    <p>Image Preview</p>
                    <Switch onChange={()=>state.open ?setState({...state,open: false}):setState({...state,open: true}) } checked={ props.isChecked }/>
                    <div className="title">

                    </div>
                    <div className="editor">
                        <img src={props.postData.mainThumbnail}/>
                    </div>
                </div>
            );
        }else return (
            <>
                <p>Image Preview</p>
            <Switch onChange={ ()=>state.open ?setState({...state,open: false}):setState({...state,open: true}) } checked={ props.isChecked }/>
            </>
        )



    }else return null

};
export default ImagePreview;