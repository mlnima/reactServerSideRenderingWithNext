import {FC} from "react";
import Link from 'next/link';
import convertVariableNameToName from "../../../../_variables/util/convertVariableNameToName";
import {useRouter} from "next/router";
import styled from "styled-components";

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
    const {pathname, query} = useRouter()
    const postsStatus = ['all', 'draft', 'published', 'pending', 'trash', 'reported'];

    const renderStatus = postsStatus.map((type: string) => {
        return (
            <Link className={'btn btn-navigation'} key={type} href={{pathname: pathname, query: {...query, status: type}}}>
                {convertVariableNameToName(type)}
            </Link>
        )
    })

    return (
        <AssetStatusNavigationStyledDiv className='asset-page-status-navigation'>
            {renderStatus}
        </AssetStatusNavigationStyledDiv>
    );
};
export default AssetStatusNavigation;
