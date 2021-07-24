import React, { useContext, useRef,useLayoutEffect} from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import TopBar from "../adminIncludes/TopBar/AdminTopBar";
import SideBar from "../adminIncludes/SideBar/SideBar";
import {AppContext} from "../../context/AppContext";
const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
import Link from "next/link";

const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})
import {getSetting} from '../../_variables/ajaxVariables'
import {createGlobalStyle} from "styled-components";

let GlobalStyle = createGlobalStyle`${props => props.globalStyleData}`


const AdminLayout = props => {
    const contextData = useContext(AppContext);
    const container = useRef(null);
    const Admin = useRef(null);

    useLayoutEffect(() => {
        getSetting('identity', window.location.origin, false, Date.now()).then(identity => {
            contextData.dispatchSiteIdentity({
                ...contextData.siteIdentity,
                ...identity.data.setting.data
            })
        })
        getSetting('design', window.location.origin, false, Date.now()).then(design => {
            contextData.dispatchSiteDesign({
                ...contextData.siteDesign,
                ...design.data.setting.data
            })
        })

    }, []);

    if (contextData.userData.role === 'administrator') {
        return (
            <>
                <Head>
                    <title>Admin Panel</title>
                    <meta name="theme-color" content="#000000"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta charSet="utf-8"/>
                </Head>
                <GlobalStyle globalStyleData={contextData?.siteDesign?.customStyles || ''}/>
                <TopBar/>
                <div ref={container} className="admin-container">
                    <style jsx>{`
.admin-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:  'admin-content' 'admin-footer';
  position: relative;
}
.Admin {
  grid-area: admin-content;
  background-color: #f1f1f1;
  color: black;
  min-height: 100vh;
  float: left;
  -webkit-font-smoothing: subpixel-antialiased;
}
.blurArea {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
}

#access-denied-admin{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 768px) {
    .Admin{
      padding: 10px;
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
                .access-denied-admin{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .access-denied-admin>h1>a{
                    color: white;
                }
            `}</style>
            <h1>
                <Link href='/login'>
                    <a>403 Forbidden</a>
                </Link>
            </h1>
        </div>
    )

};

export default AdminLayout;
