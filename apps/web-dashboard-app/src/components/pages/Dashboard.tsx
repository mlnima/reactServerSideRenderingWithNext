import React, {FC, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Style = styled.main`
  h1 {
    text-align: center;
  }

  .quick-access {
    width: 100%;

    .quick-access-items {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .btn {
        padding: 15px 30px;
      }

    }

  }
`
interface PropTypes {

}

const Dashboard: FC<PropTypes> = (props) => {

    const [state, setState] = useState({
        quickAccessLinks: [
            {
                name: 'General Settings',
                pathURL: '/dashboard/settings/general'
            },
            {
                name: 'Posts',
                pathURL: '/dashboard/assets?assetsType=posts'
            },
            {
                name: 'Users',
                pathURL: '/dashboard/assets?assetsType=users',
            },
            {
                name: 'Pages',
                pathURL: '/dashboard/assets?assetsType=pages',
            },
            {
                name: 'File Manager',
                pathURL: '/dashboard/fileManager',
            },
            {
                name: 'Widgets',
                pathURL: '/dashboard/design/widgets',
            },
            {
                name: 'Custom Styles',
                pathURL: '/dashboard/design/customStyles',
            },
            {
                name: 'Custom Colors',
                pathURL: '/dashboard/design/customColors',
            },
            {
                name: 'Terminal',
                pathURL: '/dashboard/tools/terminal',
            },
            {
                name: 'Tools',
                pathURL: '/dashboard/tools',
            }
        ],
        socketsCount: 0
    })

    const renderQuickAccessLinks = state.quickAccessLinks.map(linkData => {
        return (
            <Link key={linkData.name} to={linkData.pathURL} className='btn btn-secondary'>
                {linkData.name}
            </Link>
        )
    })

    return (
        <Style>
            <h1>Dashboard</h1>
            <h2>Your IP is: {0}</h2>
            <h2>ENV : {process.env.NODE_ENV}</h2>
            <div className={'quick-access'} aria-label="outlined button group">
                <h2>Quick Access</h2>
                <div className={'quick-access-items'}>
                    {renderQuickAccessLinks}
                </div>

            </div>
            {/*<div className={'active-events'}>*/}
            {/*    <h2>Connected Sockets</h2>*/}
            {/*    <button className={'btn btn-primary'} onClick={getActiveUsersCount}>active sockets*/}
            {/*        : {state?.socketsCount}</button>*/}

            {/*</div>*/}
        </Style>
    )
};
export default Dashboard