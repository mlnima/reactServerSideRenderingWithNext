import Link from 'next/link';
import {convertVariableNameToName} from '../../../../_variables/_variables'
import {useRouter} from "next/router";

const AssetStatusNavigation = props => {
    const router = useRouter()
    const postsStatus = ['all', 'draft', 'published', 'pending', 'trash', 'reported'];

    const renderStatus = postsStatus.map(type => {
        return (
            <Link key={type} href={{
                pathname: router ? router.pathname : '',
                query: {...router.query, status: type}
            }}><a className='asset-page-status-navigation-item'>
                <style jsx>{`
                  .asset-page-status-navigation-item {
                    margin: 3px;
                  }
                `}</style>
                {convertVariableNameToName(type)}
            </a>
            </Link>
        )
    })

    return (
        <div className='asset-page-status-navigation'>
            <style jsx>{`
              .asset-page-status-navigation {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
              }
            `}</style>
            {renderStatus}
        </div>
    );
};
export default AssetStatusNavigation;
