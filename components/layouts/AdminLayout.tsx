import React, {useRef, useEffect} from 'react';
import dynamic from "next/dynamic";
import AdminPanelTopBar from "../adminIncludes/AdminPanelTopBar/AdminPanelTopBar";
import AdminPanelMainMenu from "../adminIncludes/AdminPanelMainMenu/AdminPanelMainMenu";
import {useDispatch, useSelector} from 'react-redux';
import AdminPanelGlobalStyles from "../global/Styles/AdminPanelGlobalStyles";
import Link from "next/link";
import AdminDataSetter from "../global/AdminDataSetter";
import GlobalStyles from "../global/Styles/GlobalStylesComponent";
import styled from "styled-components";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import LoadingV2 from "@components/includes/LoadingV2/LoadingV2";
import {fetchUserAutoLogin} from "@store_toolkit/clientReducers/userReducer";

const Loading = dynamic(() => import('../includes/Loading/Loading'), {ssr: false})
const AlertBox = dynamic(() => import('../includes/AlertBox/AlertBox'), {ssr: false})

const AdminLayout403StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--admin-main-background-color);
  width: 100vw;
  min-height: 100vh;

  a {
    color: var(--admin-main-text-color);
  }
`


const AdminLayoutStyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'admin-panel-topbar'
                       'admin-content' 
                       'admin-footer';
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

    const dispatch = useDispatch()
    const container = useRef(null);
    const Admin = useRef(null);

    const {globalState, loggedIn, userData, loading, alert} = useSelector(({globalState, user}: StoreTypes) => {
        return {
            globalState,
            loggedIn: user.loggedIn,
            userData: user.userData,
            loading: globalState.loading,
            alert: globalState.alert.active,
        }
    })

    useEffect(() => {

        !!localStorage?.wt && dispatch(
            fetchUserAutoLogin(
                {
                    fields: ['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']
                }
            ))

    }, [props]);

    if (userData.role === 'administrator') {
        return (

            <AdminLayoutStyledDiv ref={container} className="admin-container">
                <AdminDataSetter userRole={userData.role}/>
                <AdminPanelGlobalStyles/>
                <GlobalStyles/>
                <AdminPanelTopBar/>
                <AdminPanelMainMenu/>
                <main ref={Admin} className="Admin">
                    {props.children}
                </main>
                <LoadingV2/>
                {/*{loading ? <Loading/> : null}*/}
                {alert && globalState?.alert?.message ? <AlertBox/> : null}
            </AdminLayoutStyledDiv>

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


// <Provider store={adminStore}>
// </Provider>