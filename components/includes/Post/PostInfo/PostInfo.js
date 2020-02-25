import React,{useEffect,useState,useContext} from 'react';
import TagsAndCategoriesActors from "../TagsAndCategoriesActors/TagsAndCategoriesActors";
import FA  from 'react-fontawesome'
import ProgressBar from "../../ProgressBar/ProgressBar";
import {likeValueCalculator} from "../../../../_variables/_variables";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";

const PostInfo = props => {
    const [state, setState] = useState({
        likeValue:0
    });
    useEffect(()=>{
        setState({
            ...state,
            likeValue: likeValueCalculator(props.likes,props.disLikes)
        });


        likeDislikeView(props.id,'views')
    },[]);

    useEffect(()=>{
console.log(props.likes,props.disLikes)
console.log(likeValueCalculator(1,1))
    },[state]);
    return (
        <div className='post-info'>
            <h1>{props.title}</h1>
            <div className="like">
                <button onClick={()=>likeDislikeView(props.id,'likes')}><FA className='fontawesomeMedium' name="thumbs-up" /></button>
                <button onClick={()=>likeDislikeView(props.id,'disLikes')}><FA className='fontawesomeMedium' name="thumbs-down" /></button>
            </div>
            <div className="views">

            </div>
            <ProgressBar value={state.likeValue}/>
            <div className="description">{props.description}</div>
            <TagsAndCategoriesActors type='actors' data={props.actors} />
            <TagsAndCategoriesActors type='tags' data={props.tags} />
            <TagsAndCategoriesActors type='categories' data={props.categories} />
        </div>
    );
};
export default PostInfo;