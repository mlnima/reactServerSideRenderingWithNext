import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";

const ArticleTypeCard = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <Link href={`/post/${props.postType}/${props._id}`} scroll={false}>
            <a rel='next' onClick={props.onClickLoadingHandler}  className='post-element-link-internal'>
                <p className='detail'>more info about {props.title} </p>

            </a>
        </Link>
    );
};
export default ArticleTypeCard;
