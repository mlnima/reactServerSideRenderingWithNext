import React, {useEffect, useState, useContext, useRef} from 'react';
import {useRouter} from "next/router";


const PostsByMeta = props => {
    const metaInput = useRef(null)
    const router = useRouter()

    const onSearchByMetaHandler = e => {
        e.preventDefault()
        router.push({
            pathname: router.pathname,
            query: {...router.query, metaId: metaInput.current.value},
        })
    }


    return (
        <form className='posts-by-meta' onSubmit={e => onSearchByMetaHandler(e)}>
            <style jsx>{`
              .posts-by-meta {
                display: flex;
                justify-content: center;
                align-items: center;

                input {

                  margin: 0 4px;
                }
              }
            `}</style>
            <p>Meta ID :</p>
            <input ref={metaInput} type={'text'}/>
            <button>Search</button>
        </form>
    );
};
export default PostsByMeta;
