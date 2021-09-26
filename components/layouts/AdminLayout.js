import React, {useContext, useRef, useEffect} from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import {useDispatch, useSelector} from 'react-redux';
import {autoUserLogin} from "../../store/actions/userActions";
import {AppContext} from "../../context/AppContext";
import {getSetting} from '../../_variables/ajaxVariables'
import {createGlobalStyle} from "styled-components";
import AdminPanelGlobalStyles from "../global/AdminPanelGlobalStyles";
import Link from "next/link";

const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`

const AdminLayout = props => {

    const dispatch = useDispatch()
    const loggedIn = useSelector(state => state.user.loggedIn)
    const userData = useSelector(state => state.user.userData)

    useEffect(() => {
        if (localStorage.wt && !loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'coverImage']))
        }
    }, []);


    useEffect(() => {
        console.log('userData',userData)
    }, [userData]);

    const contextData = useContext(AppContext);
    const container = useRef(null);
    const Admin = useRef(null);

    useEffect(() => {
        getSetting('identity', false).then(identity => {
            contextData.dispatchSiteIdentity({
                ...contextData.siteIdentity,
                ...identity.data.setting.data
            })
        })
        getSetting('design', false).then(design => {
            contextData.dispatchSiteDesign({
                ...contextData.siteDesign,
                ...design.data.setting.data
            })
        })

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
                <AdminPanelGlobalStyles/>
                <GlobalStyle globalStyleData={contextData?.siteDesign?.customStyles || ''}/>

                <TopBar/>
                <div ref={container} className="admin-container">
                    <style jsx>{`
                      .admin-container {
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
                      }

                      @media only screen and (min-width: 768px) {
                        .admin-container {
                          .Admin {
                            padding: 10px;
                          }
                        }
                      }
                    `}</style>
                    <SideBar/>
                    <div ref={Admin} className="Admin">
                        {props.children}
                    </div>

                </div>

                {contextData.alert.active && contextData.alert.alertMessage ? <AlertBox/> : null}
                {contextData.state.loading ? <Loading/> : null}
            </>
        );
    } else return (
        <div className='access-denied-admin'>
            <style jsx>{`
              .access-denied-admin {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--admin-main-background-color);
                width: 100vw;
                height: 100vh;

                a {
                  color: var(--admin-main-text-color);
                }
              }

            `}</style>
            <h1>
                <Link href={'/auth/login'}>
                    <a>403 Forbidden</a>
                </Link>
            </h1>
        </div>
    )

};

export default AdminLayout;
