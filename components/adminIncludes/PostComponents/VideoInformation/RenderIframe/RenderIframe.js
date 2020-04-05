import React,{useEffect,useState} from 'react';

const RenderIframe = props => {

    const [state, setState] = useState({
        open:false
    });

    if (!state.open && props.postData.videoEmbedCode){
        return(
            <button onClick={()=>state.open ?setState({...state,open: false}):setState({...state,open: true})}>Preview Embed Video</button>
        )
    }else if (state.open && contextData.editingPostData.videoEmbedCode){
        return (
            <div className='VideoEmbedCode VideoInformationSection'>
                <button onClick={()=>state.open ?setState({...state,open: false}):setState({...state,open: true})}>Hide Embed Video</button>
                <div className="title">
                    <p>Video Iframe Preview</p>
                </div>
                <div className="editor">
                    <iframe ref={props.postData.videoEmbedCode} />
                </div>
            </div>
        )
    }else return null

};
export default RenderIframe;