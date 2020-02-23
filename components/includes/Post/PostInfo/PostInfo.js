import React,{useEffect,useState,useContext} from 'react';
import TagsAndCategories from "../TagsAndCategories/TagsAndCategories";
const PostInfo = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{

    },[]);
    return (
        <div className='post-info'>
            <h1>{props.title}</h1>
            <div className="like">
                <button>like</button>
                <button>dislike</button>
            </div>
            <div className="views">

            </div>
            <div className="description">{props.description}</div>
            <TagsAndCategories type='tags' data={props.tags} />
            <TagsAndCategories type='categories' data={props.categories} />
        </div>
    );
};
export default PostInfo;