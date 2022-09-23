import React, {useRef, useEffect} from 'react';
import AdminPanelTopBar from "@components/adminIncludes/AdminPanelTopBar/AdminPanelTopBar";
import AdminPanelMainMenu from "@components/adminIncludes/AdminPanelMainMenu/AdminPanelMainMenu";
import {useSelector} from 'react-redux';
import AdminPanelGlobalStyles from "@components/global/Styles/AdminPanelGlobalStyles";
import Link from "next/link";
import AdminDataSetter from "@components/global/AdminDataSetter";
import GlobalStyles from "@components/global/Styles/GlobalStylesComponent";
import styled from "styled-components";
import LoadingV2 from "@components/includes/LoadingV2/LoadingV2";
import AlertBox from "@components/includes/AlertBox/AlertBox";
import {useAppDispatch} from "@store_toolkit/hooks";
import {fetchUserAutoLogin} from "@store_toolkit/clientReducers/userReducer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
// import {Provider} from 'react-redux'
// import {makeStore} from "@store_toolkit/adminStore";

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

    const dispatch = useAppDispatch()
    const container = useRef(null);
    const Admin = useRef(null);

    const {adminPanelGlobalState, userData, alert} = useSelector(
        ({
             adminPanelGlobalState,
             adminPanelUsers
         }: Store) => {
            return {
                adminPanelGlobalState,
                userData: adminPanelUsers?.userData,
                alert: adminPanelGlobalState?.alert?.active,
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

    if (userData?.role === 'administrator') {
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
                {/*<AlertBox/>*/}
                {alert && adminPanelGlobalState?.alert?.message ? <AlertBox/> : null}
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