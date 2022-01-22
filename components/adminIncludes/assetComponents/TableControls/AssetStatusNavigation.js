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
const AssetStatusNavigation = props => {
    const router = useRouter()
    const postsStatus = ['all', 'draft', 'published', 'pending', 'trash', 'reported'];

    const renderStatus = postsStatus.map(type => {
        return (
            <Link key={type} href={{
                pathname: router ? router.pathname : '',
                query: {...router.query, status: type}
            }}>
                <a className={'btn btn-navigation'}>
                    {convertVariableNameToName(type)}
                </a>
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
