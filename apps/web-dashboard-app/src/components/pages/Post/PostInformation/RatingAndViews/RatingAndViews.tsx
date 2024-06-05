import {convertVariableNameToName} from "shared-util";
import {useSelector} from "react-redux";
import {DashboardStore, Store} from "typescript-types";
import {FC} from "react";

interface PropTypes{
    name:string,
    onChangeHandler:Function,
    rendering:boolean
}

const RatingAndViews:FC<PropTypes> = props => {
    const post = useSelector(({posts}: DashboardStore) => posts.post);
    if (props.rendering) {
        return (
            <div className='post-information-section'>
                <div className="title">
                    <p>{convertVariableNameToName(props.name)}</p>
                </div>
                <div className="editor">
                    {/*//@ts-ignore*/}
                    <input type={'number'} className='primaryInput' name={props.name} value={post?.[props.name] || 0} onChange={e => props.onChangeHandler(e)}/>
                </div>
            </div>
        );
    } else return null

};
export default RatingAndViews;