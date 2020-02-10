import React,{useEffect,useState,useContext} from 'react';
import HeaderTable from "./HeaderTable";
import BodyTable from "./BodyTable";
import './PostsDataTable.scss';

const PostsDataTable = props => {

    return (
        <table className='DataTable'>
            <HeaderTable/>
            <BodyTable/>
        </table>
    );
};
export default PostsDataTable;