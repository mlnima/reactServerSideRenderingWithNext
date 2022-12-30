import {FC} from "react";

interface PropType{
    rendering:boolean,
}

const VideoUrls:FC<PropType> = (props) => {
    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Video URL</p>
                </div>
                <div className="editor">
                    <input className='textInput'/>
                </div>
            </div>
        );
    }else return null
};
export default VideoUrls;