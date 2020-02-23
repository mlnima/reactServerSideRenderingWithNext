import React,{useEffect,useState,useContext} from 'react';
import Link from "next/link";
const TagsAndCategories = props => {
    const [state, setState] = useState({
        data:props.data || [],
        type: props.type||'tags'
    });

    const renderData = state.data.map(item=>{
        const path = '/' + state.type + '/' + item;
        return(
            <Link href={path} key={item}><a>{item}xx</a></Link>
        )
    });

    if (props.data){
        return (
            <div className={state.type + ' tags-categories'}>
                {renderData}
            </div>
        );
    }else return null

};
export default TagsAndCategories;