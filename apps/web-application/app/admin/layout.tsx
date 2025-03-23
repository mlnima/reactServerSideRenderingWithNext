
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import '@components/global/styles/global.styles.scss';
import './layout.scss';
import Topbar from './components/Topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import ReduxProvider from '@storeDashboard/ReduxProvider';
import { ReactNode } from 'react';
import AdminLayoutDataInitializer from './AdminLayoutDataInitializer';


const AdminLayout = ({ children }: { children: ReactNode }) => {

  return (
    <html lang={'en'}>
    <body className={`dark `}>
    <ReduxProvider>
      <Topbar />
      <Sidebar />
      <main>
        {children}
      </main>
      <AdminLayoutDataInitializer/>
    </ReduxProvider>
    </body>
    </html>

  );
};

export default AdminLayout;


//import {commonAPIRequestClearCaches} from "@repo/api-requests";