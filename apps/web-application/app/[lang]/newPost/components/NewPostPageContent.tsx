'use client';
import {FC, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
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

            // if (!!userData?.draftPost) {
            //   await checkPostExist(userData?.draftPost).then(res=>{
            //         if (res.data.exist){
            //             console.log(`res.data.exist=> `,res.data.exist)
            //             dispatch(setAlert({
            //                 message: dictionary?.[
            //                     "Edit or Delete Your Existing Draft Before Creating a New Post"
            //                     ] || "Edit or Delete Your Existing Draft Before Creating a New Post",
            //                 type: "error"
            //             }))
            //             router.push(`${localeToSet}/editPost/${userData?.draftPost}`);
            //         }
            //     })
            // }

            if (!searchParams.get('postType')) {
                router.push(`${localeToSet}/`);
            }

            if (!!searchParams.get('postType') && loggedIn) {

                const initialData = {
                    author: userData?._id,
                    title: " ",
                    postType: searchParams.get('postType'),
                    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
                }

                await clientAPIRequestCreateNewPost({...initialData}).then((response) => {
                    if (response?.postId) {
                        if (!!response?.message){
                            dispatch(setAlert({
                                message: dictionary?.[response.message] || response.message,
                                type: "error"
                            }))
                        }
                        router.push(`${localeToSet}/editPost/${response.postId as string}`)
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
