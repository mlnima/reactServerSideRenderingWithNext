import React, {useState} from 'react';
import AdminPanelTopBar from "../../adminIncludes/AdminPanelTopBar/AdminPanelTopBar";
import AdminPanelMainMenu from "../../adminIncludes/AdminPanelMainMenu/AdminPanelMainMenu";
import AdminPanelGlobalStyles from "../../global/Styles/AdminPanelGlobalStyles";
import Link from "next/link";
import AdminDataSetter from "../../global/AdminDataSetter";
import GlobalStyles from "../../global/Styles/GlobalStylesComponent";
import styled from "styled-components";
import wrapper from '../../../store_toolkit/adminStore';
import {Provider} from 'react-redux';
import AdminLayoutInitializer from "@components/layouts/AdminLayout/AdminLayoutInitializer";


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
    width: 100vw;
    min-height: 100vh;

    a {
      color: var(--main-text-color, #fff);
    }
  }

  .Admin {
    grid-area: admin-content;
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
            <AdminPanelGlobalStyles/>
            <AdminLayoutStyledDiv className={'admin-container'}>
                <AdminDataSetter setUnauthorized={setUnauthorized}/>
                <AdminLayoutInitializer/>
                {unauthorized ?
                    <div className={'admin-unauthorized'}>
                        <h1>
                            <Link href={'/auth/login'}>
                                403 Forbidden
                            </Link>
                        </h1>
                    </div> :
                    <>
                        <GlobalStyles/>
                        <AdminPanelTopBar/>
                        <AdminPanelMainMenu/>
                        <main className="Admin">
                            {children}
                        </main>
                    </>
                }

            </AdminLayoutStyledDiv>
        </Provider>
    );

};

export default AdminLayout;

