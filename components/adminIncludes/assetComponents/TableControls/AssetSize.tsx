import {FC} from 'react';
import {useRouter} from "next/router";
import styled from "styled-components";
import staticDataJson from '../../../../static/jsons/staticData.json'

const AssetSizeStyledDiv = styled.select`
  width: 100px;
`

const AssetSize: FC = () => {

    const {pathname,query,push} = useRouter()
    const range = [10,20,30,40,50,60,70,80,90,100,200,300,400,500,1000]

    const onChangeHandler = e => {
        push({
            pathname: pathname,
            query: {...query, size: e.target.value}
        }).finally()
    }

    return (
        //@ts-ignore
        <AssetSizeStyledDiv className={'custom-select'} defaultValue={staticDataJson?.identity?.postsCountPerPage || 30}
                            onChange={e => onChangeHandler(e)}
        >
            {/*<option value={staticDataJson?.identity?.postsCountPerPage}>*/}
            {/*    {staticDataJson?.identity?.postsCountPerPage}*/}
            {/*</option>*/}
            {range.map(unit=>{
                return  <option value={unit}>{unit}</option>
            })}
        </AssetSizeStyledDiv>
    );
};
export default AssetSize;
