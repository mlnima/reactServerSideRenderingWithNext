import { FC } from "react";
import createDOMPurify from 'dompurify';
import './PostDescription.scss'

interface IProps {
    description?: any;
}

const PostDescription: FC<IProps> = ({ description }) => {
    let DOMPurify;

    if (typeof window !== 'undefined') {
        // Client-side
        DOMPurify = createDOMPurify(window);
    } else {
        // Server-side
        const { JSDOM } = require('jsdom');
        DOMPurify = createDOMPurify(new JSDOM().window);
    }

    if (!!description && typeof description === 'string') {
        const cleanHTML = DOMPurify.sanitize(description);
        return (
            <div className={'postDescription'}
                 dangerouslySetInnerHTML={{__html: cleanHTML}}/>
        );
    } else {
        return null;
    }
};

export default PostDescription;
















// 'use server'
// import './PostDescription.scss';
// import {FC} from "react";
// import createDOMPurify from 'dompurify';
// import {JSDOM} from 'jsdom';
//
//
// interface IProps {
//     description?: any;
// }
//
//
// const DOMPurify = createDOMPurify(new JSDOM().window);
//
// const PostDescription: FC<IProps> = ({description}) => {
//     if (!!description && typeof description === 'string') {
//         const cleanHTML = DOMPurify.sanitize(description);
//
//         return (
//             <div className={'postDescription'}
//                  dangerouslySetInnerHTML={{__html: cleanHTML}}/>
//         )
//
//     } else return null
// }
//
// export default PostDescription;


// return (
//     <div className={'postDescription'}
//          dangerouslySetInnerHTML={{ __html: typeof description === 'string' ? description : '' }}/>
// )
