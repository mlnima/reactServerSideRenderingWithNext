import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import withRouter from "next/dist/client/with-router";
import { AppContext } from "../../../context/AppContext";

const Index = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        pageNo:1,
        limit:30
    });

    useEffect(() => {
           contextData.functions.getPosts(state.limit,state.pageNo).then(res=>{
               contextData.dispatchAdminPosts(previousPosts=>[...previousPosts,...res.data.posts])
           })
    }, [state]);

    useEffect(()=>{
        console.log( contextData.adminPosts)
    },[contextData.adminPosts ]);

    const renderPost = contextData.adminPosts.map(post=>{

        return(

                <p key={contextData.adminPosts.indexOf(post)}>{post.title}</p>

        )
    })

    return (
        <>
            <AdminLayout>
                <div className='Posts'>
                    {renderPost}
                </div>
            </AdminLayout>
        </>
    );
};

Index.getInitialProps =  ({ req }) => {
  return {}
};
export default withRouter(Index);