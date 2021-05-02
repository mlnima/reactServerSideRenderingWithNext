import { useContext, useRef } from 'react';
import { newComment } from '../../../../_variables/ajaxPostsVariables';
import { AppContext } from '../../../../context/AppContext';
import withRouter from 'next/dist/client/with-router';

const CommentFrom = props => {
    const contextData = useContext(AppContext);
    const authorInput = useRef(null);
    const emailInput = useRef(null);
    const bodyInput = useRef(null);

    const onSubmitHandler = e => {
        e.preventDefault();
        const commentData = {
            body: bodyInput.current.value,
            author: authorInput.current ? authorInput.current.value : contextData.userData.username || contextData.userData.username,
            authorID: contextData.userData._id,
            email: emailInput.current ? emailInput.current.value : contextData.userData.email || contextData.userData.email,
            onDocumentId: props.documentId,
            onDocumentTitle:props.documentTitle
        };
        if (props.documentId) {
            newComment(commentData).then(res => {
                bodyInput.current.value=''
                props.router.push({
                    pathname:props.router.pathname,
                    query:props.router.query
                });

            }).catch(err => {
                console.log(err)
            });
        };
    }

    const RenderLoggedInUser = () => {
        if (!contextData.userData.role && !contextData.userData._id) {
            return (
                <div className='comment-form-info'>
                <style jsx>{`
                    .comment-form-info{
                        display: flex;
                        justify-content: flex-start;
                    }
                    input{
                        width: 50%;
                        margin: 3px;
                        background-color: var(--post-page-info-background-color);
                        color: var(--post-page-info-color);
                        padding:5px;
                        border: none;
                    }
                `}</style>
                    <input ref={ authorInput } required={ true } placeholder='Name' name='author'/>
                    <input ref={ emailInput } required={ true } placeholder='Email' name='email' type='email'/>
                </div>
            )
        } else return null
    }

    return (
        <form className='comment-form' onSubmit={ e => onSubmitHandler(e) }>
        <style jsx>{`
            .comment-form{
                display: flex;
                flex-direction: column;
                width: 95%;
            }
            .comment-form-input {
                display: flex;
            }
            textarea {
                width: 100%;
                min-height: 200px;
            }
            textarea {
                background-color: var(--post-page-info-background-color);
                margin: 3px;
                padding:5px;
                border: none;
                color: var(--post-page-info-color);
            }
            .comment-form-submit-button{
                padding: 7px 20px;
                text-align: center;
                box-sizing: border-box;
                color: var(--post-page-info-color);
                background-color: var(--post-page-info-background-color);
                border:none;
                margin: 5px;
                max-width: 150px;
            }
        `}</style>
            <div >
                <RenderLoggedInUser/>
                <div className='comment-form-input'>
                    <textarea ref={ bodyInput } required={ true } placeholder='Comment' name='body'/>
                </div>
            </div>
            <button className='comment-form-submit-button' type='submit'>Post Comment</button>
        </form>
    );
};
export default withRouter(CommentFrom);
