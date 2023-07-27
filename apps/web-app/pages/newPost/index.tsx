import {FC, useEffect} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {wrapper} from "@store_toolkit/store";
import {useRouter} from "next/router";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {clientAPIRequestCreateNewPost} from "api-requests";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";

const Style = styled.div``;

interface PropTypes {

}

const newPost: FC<PropTypes> = ({}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {loggedIn, userData} = useAppSelector(({user}) => {
        return {
            loggedIn: user.loggedIn,
            userData: user.userData,
        }
    })

    const onCreateNewPost = async () => {
        try {
            if (loggedIn && userData?._id && router.query?.postType && !userData.draftPost) {
                await clientAPIRequestCreateNewPost({
                    postType: router.query?.postType as string,
                    author: userData?._id,
                    title: "no title"
                }).then((response) => {
                    if (response?.newPostId) {
                        router.push(`/editPost/${response.newPostId as string}`)
                    }
                })
            } else if (!!userData?.draftPost) {
                await router.push(`/editPost/${userData?.draftPost}`)
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        if (loggedIn) {
            onCreateNewPost()
        }else{
            dispatch(loginRegisterForm('login'))
        }
    }, [router.query, loggedIn]);

    return (
        <Style>
            <HeadSetter/>
            <h1>Please Wait, Initializing New Post</h1>
        </Style>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'newPostPageRightSidebar',
            'newPostPageLeftSidebar',
            'newPost'
        ], {
            setHeadData: true,
            page: 'newPost'
        },
        store)

    return {
        props: {}
    }
})


export default newPost;
