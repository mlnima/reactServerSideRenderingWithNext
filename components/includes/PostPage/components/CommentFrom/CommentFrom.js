import { useContext, useRef } from 'react';
import { newComment } from '../../../../../_variables/ajaxPostsVariables';
import { AppContext } from '../../../../../context/AppContext';
import withRouter from 'next/dist/client/with-router';

const CommentFrom = props => {
    const contextData = useContext(AppContext);
    const bodyInput = useRef(null);

    const onSubmitHandler = e => {
        e.preventDefault();
        if (contextData.userData._id){
            const commentData = {
                body: bodyInput.current.value,
                author: contextData.userData._id,
                onDocumentId: props.documentId,
            };
            if (props.documentId) {
                newComment(commentData).then(res => {
                    bodyInput.current.value=''
                    // props.router.push({
                    //     pathname:props.router.pathname,
                    //     query:props.router.query
                    // });
                    props.reGetComments()

                }).catch(err => {
                    console.log(err)
                });
            };
        }else {
            contextData.dispatchState({
                ...contextData.state,
                loginRegisterFormPopup:true
            })
        }

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

                <div className='comment-form-input'>
                    <textarea ref={ bodyInput } required={ true } placeholder='Comment' name='body'/>
                </div>
            </div>
            <button className='comment-form-submit-button' type='submit'>Post Comment</button>
        </form>
    );
};
export default withRouter(CommentFrom);