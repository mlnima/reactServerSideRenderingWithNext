import React from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";

const AssetSizeStyledDiv = styled.select`
  width: 100px;
`
const AssetSize = () => {

    const router = useRouter()

    const onChangeHandler = e => {
        router?.push({
            pathname: router.pathname,
            query: {...router.query, size: e.target.value}
        })
    }

    return (
        <AssetSizeStyledDiv className={'custom-select'}
                            defaultValue={'30'}
                            onChange={e => onChangeHandler(e)}
        >
            <option value={process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE}>{process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE}</option>
            <option value={'10'}>10</option>
            <option value={'20'}>20</option>
            <option value={'30'}>30</option>
            <option value={'40'}>40</option>
            <option value={'50'}>50</option>
            <option value={'60'}>60</option>
            <option value={'70'}>70</option>
            <option value={'80'}>80</option>
            <option value={'90'}>90</option>
            <option value={'100'}>100</option>
            <option value={'200'}>200</option>
            <option value={'500'}>500</option>
            <option value={'1000'}>1000</option>
        </AssetSizeStyledDiv>
    );
};
export default AssetSize;
