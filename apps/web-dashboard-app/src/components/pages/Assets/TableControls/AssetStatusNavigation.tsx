import {FC, useMemo} from "react";
import {Link, useLocation, useNavigate, useSearchParams,Navigate } from 'react-router-dom';
import {convertVariableNameToName} from "custom-util";
import styled from "styled-components";
import paramsObjectGenerator from "@variables/paramsObjectGenerator";

const AssetStatusNavigationStyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  
  .btn-navigation {
    margin: 0 2px;
  }
`

const AssetStatusNavigation: FC = () => {
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search]);
    const postsStatus = ['all', 'draft', 'published', 'pending', 'trash', 'reported'];


    const renderStatus = postsStatus.map((type: string) => {

        const onNavigate = ()=>{
            setSearch({...query, status: type},{replace:true})
        }

        return (
            <button className={'btn btn-navigation'} key={type} onClick={onNavigate}>
                {convertVariableNameToName(type)}
            </button>
        )
    })

    return (
        <AssetStatusNavigationStyledDiv className='asset-page-status-navigation'>

            {renderStatus}
        </AssetStatusNavigationStyledDiv>
    );
};
export default AssetStatusNavigation;
