import {useEffect, useState} from 'react'
//import Analytics from '../../components/adminIncludes/Analytics/Analytics'
import Link from "next/link";
import _ from "lodash";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import socket from '@_variables/socket';
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const AdminHomePageStyledDiv = styled.div`
  h1 {
    text-align: center;
  }
  .quick-access{
    width: 100%;
    .quick-access-items{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .btn{
        padding: 15px 30px;
      }
      
    }

  }
`
const AdminHomePage = () => {

    const ip = useSelector((store: StoreTypes) => store?.settings.ip)

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

    const getActiveUsersCount = ()=>{
        socket.emit('giveSocketsList')
    }


    const renderQuickAccessLinks = state.quickAccessLinks.map(linkData => {
        return (
            <Link key={_.uniqueId('id_')} href={linkData.pathURL}>

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
            <div className={'quick-access'}  aria-label="outlined button group">
                <h2>Quick Access</h2>
                <div className={'quick-access-items'}>
                    {renderQuickAccessLinks}
                </div>

            </div>
            <div className={'active-events'}>
                <h2>Connected Sockets</h2>
                <button className={'btn btn-primary'} onClick={getActiveUsersCount}>active sockets : {state?.socketsCount}</button>

            </div>
            {/*<Analytics/>*/}
        </AdminHomePageStyledDiv>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default AdminHomePage;