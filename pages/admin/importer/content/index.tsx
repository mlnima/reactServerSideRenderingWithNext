import React, { useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
// import {adminSaveNewPost} from "@store/adminActions/adminPanelPostsActions";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import {fetchAdminPanelSaveNewPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";

const importContent = () => {
    const userData = useSelector((store:StoreTypes) => store?.user.userData)
    const dataPreview = useRef(null)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        data: []
    });

    const onImportPostsHandler = async () => {
        if (state.data[1]) {
            // @ts-ignore
            if (state.data[1].title) {
                for await (let post of state.data) {
                    // @ts-ignore
                    post.status = 'draft'
                    // @ts-ignore
                    post.author = userData._id
                    // @ts-ignore
                    post.tags = post.tags ? post.tags.map(tag => {
                        if (tag.name && tag.type){
                            return tag
                        }else{
                            return {name: tag.trim(), type: 'tags'}
                        }
                    }) : []
                    // @ts-ignore
                    post.categories = post.categories ? post.categories.map(category => {

                        if (category.name && category.type){
                            return category
                        }else{
                            return {name: category.trim(), type: 'categories'}
                        }


                    }) : []
                    // @ts-ignore
                    post.actors = post.actors ? post.actors.map(actor => {
                        if (actor.name && actor.type){
                            return actor
                        }else{
                            return {name: actor.trim(), type: 'actors'}
                        }
                    }) : []
                    dispatch(fetchAdminPanelSaveNewPost({data:post,router:null}))

                }
            }
        }

    }
    return (

            <div className='import-content'>
                <input type='file' onChange={async e => {
                    const reader = new FileReader()
                    // @ts-ignore
                    reader.readAsText(e.target.files[0])
                    reader.onload = e => {
                        // @ts-ignore
                        setState({...state, data: JSON.parse(e.target.result)})
                    }
                }}/>
                <button onClick={() => onImportPostsHandler()}>Import Posts</button>
                <textarea ref={dataPreview}/>
            </div>

    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

importContent.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export default importContent;
