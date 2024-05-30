import {useSelector} from "react-redux";
import {videoQualities} from "data-structure";
import {FC} from "react";
import {DashboardStore} from "typescript-types";

interface PropType {
    rendering: boolean,
    onChangeHandler: any
}

const Quality: FC<PropType> = ({rendering, onChangeHandler}) => {
    const post = useSelector(({posts}: DashboardStore) => posts.post);

    if (rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>Quality</p>
                </div>
                <div className="editor">
                    <div className="option">
                        <select className={'primarySelect'} value={post?.quality || 'HD'} name='quality'
                                onChange={e => onChangeHandler(e)}>
                            {videoQualities.map((videoQuality: string,index:number) => {
                                return <option value={videoQuality} key={`${videoQuality}${index}`}>{videoQuality}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
        );
    } else return null

};
export default Quality;

