'use client';
import {FC, useEffect} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {clientAPIRequestCreateNewPost} from "@repo/api-requests";
import {loading, loginRegisterForm, setAlert} from "@store/reducers/globalStateReducer";

interface IProps {
    locale:string,
    dictionary: {
        [key: string]: string
    }
}

const NewPostPageContent: FC<IProps> = ({dictionary,locale}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch();
    const {loggedIn} = useAppSelector(({user}) => user)
    const {userData} = useAppSelector(({user}) => user)

    useEffect(() => {
        dispatch(loading(true));

        return () => {
            dispatch(loading(false));
        };
    }, []);


    const onCreateNewPost = async () => {

        try {
            const localeToSet = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`

            if (!!userData?.draftPost) {
                dispatch(setAlert({
                    message: dictionary?.[
                        "Edit or Delete Your Existing Draft Before Creating a New Post"
                        ] || "Edit or Delete Your Existing Draft Before Creating a New Post",
                    type: "error"
                }))
                await router.push(`${localeToSet}/editPost/${userData?.draftPost}`)
            }

            if (!searchParams.get('postType')) {
                await router.push(`${localeToSet}/`)
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
                        router.push(`${localeToSet}/editPost/${response.newPostId as string}`)
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
