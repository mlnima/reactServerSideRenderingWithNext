import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const AssetSizeStyledDiv = styled.select`
  width: 100px;
`

const AssetSize = () => {

    const {pathname, query, push} = useRouter()
    const range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]

    const {identity} = useSelector(({settings}: StoreTypes) => {
        return {
            identity: settings?.identity
        }
    })

    const onChangeHandler = e => {
        push({
            pathname: pathname,
            query: {...query, size: e.target.value}
        }).finally()
    }

    return (
        //@ts-ignore
        <AssetSizeStyledDiv className={'custom-select'} defaultValue={identity?.postsCountPerPage || 20}
                            onChange={e => onChangeHandler(e)}>

            {range.map(unit => {
                return <option value={unit} key={unit}>{unit}</option>
            })}
        </AssetSizeStyledDiv>
    );
};
export default AssetSize;
