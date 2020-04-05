import React,{useEffect,useState} from 'react';

const RenderIframe = props => {

    const [state, setState] = useState({
        open:false
    });

    if (!state.open && props.postData.videoEmbedCode){
        return(
            <button onClick={()=>state.open ?setState({...state,open: false}):setState({...state,open: true})}>Preview Embed Video</button>
        )
    }else if (state.open && props.postData.videoEmbedCode){
        return (
            <div className='VideoEmbedCode VideoInformationSection'>

                <div className="title">
                    <p>Video Iframe Preview</p>
                    <button onClick={()=>state.open ?setState({...state,open: false}):setState({...state,open: true})}>Hide Embed Video</button>
                </div>
                <div className="editor">
                    <iframe src={props.postData.videoEmbedCode} />
                </div>
            </div>
        )
    }else return null

};
export default RenderIframe;