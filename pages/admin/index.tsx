import React, {useEffect, useState} from 'react'
//import Analytics from '../../components/adminIncludes/Analytics/Analytics'
import {socket} from '@_variables/socket'
import Link from "next/link";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const AdminHomePageStyledDiv = styled.div`
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
const AdminHomePage = () => {

    const ip = useSelector((store: Store) => store?.settings?.ip)


    const [state, setState] = useState({
        quickAccessLinks: [
            {
                name: 'General Settings',
                pathURL: '/admin/settings/general'
            },
            {
                name: 'Posts',
                pathURL: '/admin/assets?assetsType=posts'
            },
            {
                name: 'Users',
                pathURL: '/admin/assets?assetsType=users',
            },
            {
                name: 'Pages',
                pathURL: '/admin/assets?assetsType=pages',
            },
            {
                name: 'File Manager',
                pathURL: '/admin/fileManager',
            },
            {
                name: 'Widgets',
                pathURL: '/admin/design/widgets',
            },
            {
                name: 'Custom Styles',
                pathURL: '/admin/design/customStyles',
            },
            {
                name: 'Custom Colors',
                pathURL: '/admin/design/customColors',
            },
            {
                name: 'Terminal',
                pathURL: '/admin/tools/terminal',
            },
            {
                name: 'Tools',
                pathURL: '/admin/tools',
            }
        ],
        socketsCount: 0
    })

    useEffect(() => {

        socket.on('takeSocketLists', (socketsCount: number) => {
            setState({
                ...state,
                socketsCount
            })
        })

    }, []);

    const getActiveUsersCount = () => {
        socket.emit('giveSocketsList')
    }


    const renderQuickAccessLinks = state.quickAccessLinks.map(linkData => {
        return (
            <Link key={linkData.name} href={linkData.pathURL}>

                <a className='btn btn-secondary'>
                    {linkData.name}
                </a>

            </Link>
        )
    })
    return (
        <AdminHomePageStyledDiv>
            <h1>Dashboard</h1>
            <h2>Your IP is: {ip}</h2>
            <h2>ENV : {process.env.NODE_ENV}</h2>
            <div className={'quick-access'} aria-label="outlined button group">
                <h2>Quick Access</h2>
                <div className={'quick-access-items'}>
                    {renderQuickAccessLinks}
                </div>

            </div>
            <div className={'active-events'}>
                <h2>Connected Sockets</h2>
                <button className={'btn btn-primary'} onClick={getActiveUsersCount}>active sockets
                    : {state?.socketsCount}</button>

            </div>
            {/*<Analytics/>*/}
        </AdminHomePageStyledDiv>

    );
};

export default AdminHomePage;