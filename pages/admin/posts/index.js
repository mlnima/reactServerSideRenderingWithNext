import React, { useEffect, useState, useContext } from 'react';
import AdminLayout from "../../../components/layouts/AdminLayout";
import withRouter from "next/dist/client/with-router";
import { AppContext } from "../../../context/AppContext";
import Filters from "../../../components/adminIncludes/PostsComponents/Filters/Filters";
import PostsDataTable from "../../../components/adminIncludes/PostsComponents/PostsDataTable/PostsDataTable";

const Index = props => {
    return (
        <>
            <AdminLayout>
                <div className='Posts'>
                    <Filters/>
                    <PostsDataTable/>
                </div>
            </AdminLayout>
        </>
    );
};

Index.getInitialProps =  ({ req }) => {
  return {}
};
export default withRouter(Index);