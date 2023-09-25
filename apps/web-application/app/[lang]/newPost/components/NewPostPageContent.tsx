'use client';
import {FC, useEffect} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {clientAPIRequestCreateNewPost} from "api-requests";
import {loading, loginRegisterForm, setAlert} from "@store/reducers/globalStateReducer";

interface IProps {
    dictionary: {
        [key: string]: string
    }
}

const NewPostPageContent: FC<IProps> = ({dictionary}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch();
    const {loggedIn, userData} = useAppSelector(({user}) => {
        return {
            loggedIn: user.loggedIn,
            userData: user.userData,
        }
    })

    useEffect(() => {
        dispatch(loading(true));

        return () => {
            dispatch(loading(false));
        };
    }, []);


    const onCreateNewPost = async () => {

        try {
            if (!loggedIn) {
                await router.push(`/login`)
            }

            if (!!userData?.draftPost) {
                dispatch(setAlert({
                    message: dictionary?.[
                        "Edit or Delete Your Existing Draft Before Creating a New Post."
                        ] || "Edit or Delete Your Existing Draft Before Creating a New Post.",
                    type: "error"
                }))
                await router.push(`/editPost/${userData?.draftPost}`)
                return
            }

            if (!searchParams.get('postType')) {
                await router.push(`/`)
            }

            if (
                !userData.draftPost &&
                searchParams.get('postType') &&
                loggedIn
            ) {
                const initialData = {
                    author: userData?._id,
                    title: " ",
                    postType: searchParams.get('postType'),
                    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
                }

                await clientAPIRequestCreateNewPost({...initialData}).then((response) => {
                    if (response?.newPostId) {
                        router.push(`/editPost/${response.newPostId as string}`)
                    }
                })

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
