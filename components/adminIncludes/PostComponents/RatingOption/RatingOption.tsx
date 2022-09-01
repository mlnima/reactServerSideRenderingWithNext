import { useSelector} from "react-redux";
import {adminEditPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {FC} from "react";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const RatingOption:FC = () => {
    const post = useSelector((store:Store) => store?.adminPanelPosts.post);
    const dispatch = useAdminDispatch()

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
