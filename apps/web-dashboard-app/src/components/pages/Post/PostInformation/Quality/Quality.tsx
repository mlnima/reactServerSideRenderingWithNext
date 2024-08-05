import {useSelector} from "react-redux";
import {videoQualities} from "@repo/data-structures/dist/src";
import {FC} from "react";
import {DashboardStore} from "@repo/typescript-types";

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

