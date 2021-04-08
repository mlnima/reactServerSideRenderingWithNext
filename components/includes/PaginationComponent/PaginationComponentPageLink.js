import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from 'next/link'
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
const PaginationComponentPageLink = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const asQuery = {
        ...props.content,
        page: props.pageNumber || 1,
    }

    return (
        <Link key={props.pageNumber.toString()}
              href={{
                  pathname: props.mainPath,
                  query: {...router.query, page: props.pageNumber}
              }}
              as={{
                  pathname: props.asPath,
                  query: asQuery
              }}
              scroll={false}
        >
            <a className={props.currentPage === props.pageNumber ? 'active-page' :''} >
            {props.pageNumber}
        </a>
        </Link>
    );
};
export default PaginationComponentPageLink;


