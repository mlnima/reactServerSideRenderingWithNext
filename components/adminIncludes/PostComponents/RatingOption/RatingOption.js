import {useSelector} from "react-redux";

const RatingOption = props => {
    const post = useSelector((state) => state.adminPanelPosts.post);
    return (
        <select className={'custom-select'} name='rating' value={post.rating || 'enable'} onChange={e=>{props.onChangeHandler(e)}}>
            <option value='enable'>Enable</option>
            <option value='disable'>Disable</option>
        </select>
    );
};
export default RatingOption;
