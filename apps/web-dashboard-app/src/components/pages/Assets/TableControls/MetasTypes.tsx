import styled from "styled-components";
import React, {useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "../../../../variables/paramsObjectGenerator";

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0 10px;
  }
`

const MetasType = () => {

    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search])

    const onFormatChangeHandler = (e:React.ChangeEvent<any>) => {
        setSearch({...query,metaType: e.target.value})
    }

    return (
        <Style className='assetControlItem'>
            <p>Metas Type:</p>
            <select className={'primarySelect'}
                    onChange={e => onFormatChangeHandler(e)}
                    value={query?.metaType}>
                <option value='categories' >Categories</option>
                <option value='tags'>Tags</option>
                <option value='actors'>Actors</option>
            </select>
        </Style>
    );
};
export default MetasType;