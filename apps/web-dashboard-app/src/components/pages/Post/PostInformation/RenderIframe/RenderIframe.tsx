import {useSelector} from "react-redux";
import {DashboardStore, Store} from "@repo/typescript-types";
import {FC} from "react";

interface PropTypes{
    rendering:boolean,
}
const RenderIframe:FC<PropTypes> = props => {

    const videoEmbedCode = useSelector(({posts}:DashboardStore) => posts.post?.videoEmbedCode);

    if (props.rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    Video Preview
                </div>
                <div className="editor">
                    {videoEmbedCode?<iframe src={videoEmbedCode}/>:null}
                </div>
            </div>
        )
    }else return null


};
export default RenderIframe;