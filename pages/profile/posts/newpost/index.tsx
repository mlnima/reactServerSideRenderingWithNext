import React, {useEffect, useState} from 'react';
import {getFirstLoadData} from "../../../../_variables/ajaxVariables";
import {userCreateNewPost} from "../../../../_variables/ajaxPostsVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../store/actions/globalStateActions";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {AxiosResponse} from "axios";
import {wrapper} from "../../../../store/store";

const NewPostStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .create-new-post-form {
    padding: 5px;
    width: 300px;

    .server-response {
      color: var(--main-text-color);
    }

    .create-new-post-form-section {
      width: 100%;

      .create-new-post-form-section-name {
        width: 100%;
        color: var(--main-text-color);
      }

      .create-new-post-form-section-input, .create-new-post-form-section-textarea {
        width: 100%;
      }

      .create-new-post-form-section-input {
      }

      .create-new-post-form-section-textarea {
        min-height: 300px;
      }
    }
  }
`
const newPost = () => {
    const userData = useSelector((store: StoreTypes) => store?.user.userData)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        serverResponse: ''
    });

    const [formData, setFormData] = useState({
        postType: 'article',
        status: 'pending',
        author: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        if (userData?._id) {
            setFormData({
                ...formData,
                author: userData._id
            })
        }
    }, [userData]);


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (userData?._id) {
            userCreateNewPost(formData, process.env.NEXT_PUBLIC_PRODUCTION_URL).then((res: AxiosResponse<unknown | any>) => {
                setState({
                    ...state,
                    serverResponse: res?.data?.message
                })
                setFormData({
                    ...formData,
                    title: '',
                    description: ''
                })
            })
        } else {
            dispatch(setLoginRegisterFormStatus('login'))
        }
    }

    return (
        <NewPostStyledDiv className='create-new-post main'>
            <form className='create-new-post-form' onSubmit={e => onSubmitHandler(e)}>
                <p className='server-response'>{state.serverResponse}</p>
                <div className='create-new-post-form-section'>
                    <p className='create-new-post-form-section-name'>Title</p>
                    <input className='create-new-post-form-section-input' type="text" name='title' onChange={e => onChangeHandler(e)} value={formData.title}/>
                </div>
                <div className='create-new-post-form-section'>
                    <p className='create-new-post-form-section-name'>Description</p>
                    <textarea className='create-new-post-form-section-textarea' name='description' onChange={e => onChangeHandler(e)} value={formData.description}/>
                </div>
                <button type='submit'>Send</button>
            </form>

        </NewPostStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store =>

    // @ts-ignore
    async (context) => {
        const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], 'profilePage')

        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
                ...firstLoadData,
                query: context.query
            }
        }
    })


export default newPost;
