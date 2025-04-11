
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
import StyledComponentsRegistry from '@lib/registry';
import GlobalCustomStyles from '@components/global/styles/GlobalCustomStyles';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';


const AdminLayout = async ({ children }: { children: ReactNode }) => {

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined
    }>
  );



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
      {/*<StyledComponentsRegistry>*/}
        {/*<GlobalCustomStyles*/}
        {/*  primaryModeColors={*/}
        {/*    initialSettings?.layoutSettings?.primaryModeColors || ''*/}
        {/*  }*/}
        {/*  customStyles={initialSettings?.layoutSettings?.customStyles}*/}
        {/*/>*/}
      {/*</StyledComponentsRegistry>*/}
    </ReduxProvider>
    </body>
    </html>

  );
};

export default AdminLayout;


//import {commonAPIRequestClearCaches} from "@repo/api-requests";