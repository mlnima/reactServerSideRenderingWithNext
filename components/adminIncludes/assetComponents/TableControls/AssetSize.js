import React from 'react';
import {useRouter} from "next/router";

const AssetSize = props => {

    const router = useRouter()

    const onChangeHandler = e => {
        router.push({
            pathname: router.pathname,
            query: {...router.query, size: e.target.value}
        })
    }

    return (
        <select defaultValue='30' style={{maxWidth: '50px'}} onChange={e => onChangeHandler(e)}>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='200'>200</option>
            <option value='500'>500</option>
        </select>
    );
};
export default AssetSize;
