import React, {useState} from 'react';

const RenderIframe = props => {
    const [state, setState] = useState({
        open: false
    });
    if (props.rendering){
        if (!state.open && props.postData.videoEmbedCode) {
            return (
                <div className='post-information-section'>
                    <div className="title">
                    </div>
                    <div className="editor">
                        <iframe src={props.postData.videoEmbedCode}/>
                    </div>
                </div>
            )
        } else return null
    }else return null


};
export default RenderIframe;