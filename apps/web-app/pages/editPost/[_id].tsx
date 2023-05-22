import {FC, useEffect} from "react";
import {wrapper} from "@store_toolkit/store";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useRouter} from "next/router";
import getEditingPostAction from "@store_toolkit/clientReducers/postsReducers/getEditingPostAction";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import PostEditorForm from "@components/includes/PostEditorForm/PostEditorForm";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";

const Style = styled.div``;

interface PropTypes {
}

const postEditor: FC<PropTypes> = ({}) => {

    const dispatch = useAppDispatch();
    const {loggedIn, userData, editingPost, sidebar} = useSelector(({settings, user, posts}: Store) => {
        return {
            sidebar: settings?.currentPageSettings?.sidebar,
            loggedIn: user.loggedIn,
            userData: user.userData,
            editingPost: posts?.editingPost,
        }
    })

    const {query} = useRouter();

    useEffect(() => {
        if (query._id) {
            dispatch(getEditingPostAction(query?._id as string));
        }
    }, []);

    return (
        <Style className={`postEditor-page create-new-post page-${sidebar || 'no'}-sidebar`} id={'content'}>
               <HeadSetter/>
               <PostEditorForm data={editingPost}/>
        </Style>
    )
};

export default postEditor;


// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'postEditorPageRightSidebar',
            'postEditorPageLeftSidebar',
            'postEditor'
        ], {
            setHeadData: true,
            page: 'postEditor'
        },
        store)

    return { props: {} }
})