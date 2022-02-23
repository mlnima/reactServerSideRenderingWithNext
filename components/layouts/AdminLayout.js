import React, {useRef, useEffect} from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import {useDispatch, useSelector} from 'react-redux';
import {autoUserLogin} from "../../store/clientActions/userActions";
import AdminPanelGlobalStyles from "../global/Styles/AdminPanelGlobalStyles";
import Link from "next/link";
import AdminDataSetter from "../global/AdminDataSetter";
import GlobalStyles from "../global/Styles/GlobalStyles";

const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})

import styled from "styled-components";

const AdminLayout403StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--admin-main-background-color);
  width: 100vw;
  height: 100vh;

  a {
    color: var(--admin-main-text-color);
  }
`


const AdminLayoutStyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:  'admin-content' 'admin-footer';
  position: relative;

  .Admin {
    grid-area: admin-content;
    background-color: #f1f1f1;
    color: black;
    min-height: 100vh;
    float: left;
    -webkit-font-smoothing: subpixel-antialiased;
  }

  @media only screen and (min-width: 768px) {
    .Admin {
      padding: 10px;
    }
  }
`
const AdminLayout = props => {
    const settings = useSelector(store => store?.settings)
    const globalState = useSelector(store => store?.globalState)
    const dispatch = useDispatch()
    const loggedIn = useSelector(store => store?.user?.loggedIn)
    const userData = useSelector(store => store?.user?.userData)
    const container = useRef(null);
    const Admin = useRef(null);

    useEffect(() => {
        if (localStorage.wt && !loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'coverImage']))
        }
    }, []);

    if (userData.role === 'administrator') {
        return (
            <>
                <Head>
                    <title>Admin Panel</title>
                    <meta name="theme-color" content="#000000"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap" rel="stylesheet"/>
                    <meta charSet="utf-8"/>
                </Head>
                <AdminDataSetter/>
                <AdminPanelGlobalStyles/>
                <GlobalStyles colors={settings.design?.customColors || ''} globalStyleData={settings.design?.customStyles || ''}/>
                <TopBar/>
                <AdminLayoutStyledDiv ref={container} className="admin-container">
                    <SideBar/>
                    <div ref={Admin} className="Admin">
                        {props.children}
                    </div>
                </AdminLayoutStyledDiv>

                {globalState?.loading ? <Loading/> : null}
                {globalState?.alert?.active && globalState?.alert?.message ? <AlertBox/> : null}
            </>
        );
    } else return (
        <AdminLayout403StyledDiv className='access-denied-admin'>
            <h1>
                <Link href={'/auth/login'}>
                    <a>403 Forbidden</a>
                </Link>
            </h1>
        </AdminLayout403StyledDiv>
    )

};

export default AdminLayout;
