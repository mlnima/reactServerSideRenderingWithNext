import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const RenderIframe = props => {

    const videoEmbedCode = useSelector((store:Store) => store?.adminPanelPosts?.post?.videoEmbedCode);

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                </div>
                <div className="editor">
                    {videoEmbedCode?<iframe src={videoEmbedCode}/>:null}
                </div>
            </div>
        )
    }else return null


};
export default RenderIframe;