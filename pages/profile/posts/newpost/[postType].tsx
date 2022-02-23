import React, {FC, useEffect, useState} from 'react';
import {getFirstLoadData} from "@_variables/ajaxVariables";
import {userCreateNewPost} from "@_variables/ajaxPostsVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {AxiosResponse} from "axios";
import {wrapper} from "@store/store";
import Input from "../../../../components/global/commonComponents/Input/Input";
import TextArea from "../../../../components/global/commonComponents/TextArea/TextArea";

const NewPostStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  
  .create-new-post-form {
    padding: 5px;
    width: 100%;
    max-width: 1300px;
    .server-response {
      color: var(--main-text-color);
    }
  }
`
const newPost: FC = () => {
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
                <Input className={'title'} name={'title'} onChangeHandler={onChangeHandler} type={'text'} value={formData.title} placeHolder={'Title'}/>
                <TextArea className={'description'} name={'title'} onChangeHandler={onChangeHandler} value={formData.title} placeHolder={'Description'}/>
                <button type='submit' className={'btn btn-primary'}>Send</button>
            </form>

        </NewPostStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async (context) => {

        await getFirstLoadData(
            context.req,
            ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'],
            store,
            context.locale
        )

        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            }
        }

    })


export default newPost;
