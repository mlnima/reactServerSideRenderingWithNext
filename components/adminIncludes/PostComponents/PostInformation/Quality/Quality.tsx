import {useSelector} from "react-redux";
import videoQualities from "@_dataStructures/videoQualities";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {FC} from "react";
interface QualityPropTypes{
    rendering:boolean,
    onChangeHandler:any
}
const Quality:FC<QualityPropTypes> = ({rendering,onChangeHandler}) => {
    const post = useSelector(({adminPanelPosts}:StoreTypes) => adminPanelPosts.post);
    if (rendering){
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Quality</p>
                </div>
                <div className="editor">
                    <div className="option">
                        <select className={'custom-select'} defaultValue={post.quality || 'HD'} name='quality' onChange={ e => onChangeHandler(e) }>
                            {videoQualities.map((videoQuality:string)=>{
                                return   <option value={videoQuality} key={videoQuality}>{videoQuality}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        );
    }else return null

};
export default Quality;

