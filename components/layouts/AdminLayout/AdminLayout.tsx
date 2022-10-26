import React, {useState} from 'react';
import AdminPanelTopBar from "@components/adminIncludes/AdminPanelTopBar/AdminPanelTopBar";
import AdminPanelMainMenu from "@components/adminIncludes/AdminPanelMainMenu/AdminPanelMainMenu";
import AdminPanelGlobalStyles from "@components/global/Styles/AdminPanelGlobalStyles";
import Link from "next/link";
import AdminDataSetter from "@components/global/AdminDataSetter";
import GlobalStyles from "@components/global/Styles/GlobalStylesComponent";
import styled from "styled-components";
import LoadingV2 from "@components/global/commonComponents/Loading/Loading";
import wrapper from '@store_toolkit/adminStore';
import {Provider} from 'react-redux';

const AdminLayoutStyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'admin-panel-topbar'
                       'admin-content' 
                       'admin-footer';
  position: relative;

  .admin-unauthorized {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--admin-main-background-color);
    width: 100vw;
    min-height: 100vh;

    a {
      color: var(--admin-main-text-color);
    }
  }

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
const AdminLayout = ({children, rest}) => {

    const [unauthorized, setUnauthorized] = useState(true)

    const {store} = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <AdminLayoutStyledDiv className={'admin-container'}>

                <AdminDataSetter setUnauthorized={setUnauthorized}/>

                {unauthorized &&
                <div className={'admin-unauthorized'}>
                    <h1>
                        <Link href={'/auth/login'}>
                            403 Forbidden
                        </Link>
                    </h1>
                </div>
                }

                {!unauthorized &&
                <>
                    <AdminPanelGlobalStyles/>
                    <GlobalStyles/>
                    <AdminPanelTopBar/>
                    <AdminPanelMainMenu/>
                    <main className="Admin">
                        {children}
                    </main>
                    <LoadingV2/>
                </>
                }

            </AdminLayoutStyledDiv>
        </Provider>
    );

};

export default AdminLayout;

