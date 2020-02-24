import React,{useEffect,useState,useContext} from 'react';
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import FA  from 'react-fontawesome'


const PostInfo = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{

    },[]);
    return (
        <div className='post-info'>
            <h1>{props.title}</h1>
            <div className="like">
                <button><FA className='fontawesomeMedium' name="thumbs-up" /></button>
                <button><FA className='fontawesomeMedium' name="thumbs-down" /></button>
            </div>
            <div className="views">

            </div>
            <div className="description">{props.description}</div>
            <TagsAndCategoriesActors type='actors' data={props.actors} />
            <TagsAndCategoriesActors type='tags' data={props.tags} />
            <TagsAndCategoriesActors type='categories' data={props.categories} />
        </div>
    );
};
export default PostInfo;