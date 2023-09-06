'use client';
import {FC, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {clientAPIRequestCreateNewPost} from "api-requests";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";

interface IProps {
    postType: string,
    dictionary: {
        [key: string]: string
    }
}

const NewPostPageContent: FC<IProps> = ({postType, dictionary}) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const {loggedIn, userData} = useAppSelector(({user}) => {
        return {
            loggedIn: user.loggedIn,
            userData: user.userData,
        }
    })

    const onCreateNewPost = async () => {
        try {
            if (loggedIn && userData?._id && postType && !userData.draftPost) {
                await clientAPIRequestCreateNewPost({
                    postType: postType,
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
        } else {
            dispatch(loginRegisterForm('login'))
        }
    }, [loggedIn]);

    return (
        <h1>
          {dictionary?.["Please Wait"] || "Please Wait"}, {dictionary?.["Initializing New Post"] || "Initializing New Post"}
        </h1>
    )
};
export default NewPostPageContent
