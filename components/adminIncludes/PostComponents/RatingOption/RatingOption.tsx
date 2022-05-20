import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminEditPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {FC} from "react";

const RatingOption:FC = () => {
    const post = useSelector((store:StoreTypes) => store?.adminPanelPosts.post);
    const dispatch = useDispatch()

    return (
        <select className={'custom-select'}
                name='rating'
                value={post.rating || 'enable'}
                onChange={e=>{dispatch(adminEditPost({[e.target.name]: e.target.value}))}}>
            <option value='enable'>Enable</option>
            <option value='disable'>Disable</option>
        </select>
    );
};
export default RatingOption;
