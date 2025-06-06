import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;
import '@components/global/styles/global.styles.scss';
import './layout.scss';
import Topbar from './components/Topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import ReduxProvider from '@store/ReduxProvider';
import { getDictionary } from '../../get-dictionary';
import localDetector from '@lib/localDetector';
import AlertBox from '@components/global/AlertBox/AlertBox';
import { ILayoutProps } from '@repo/typescript-types';

const AdminLayout = async (props: ILayoutProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  return (

    <html lang={'en'}>
    <body className={`dark `}>
    <ReduxProvider>
      <Topbar />
      <Sidebar />
      <main>
        {props.children}
      </main>
      <AlertBox dictionary={dictionary} />
    </ReduxProvider>
    </body>
    </html>
  );
};

export default AdminLayout;

