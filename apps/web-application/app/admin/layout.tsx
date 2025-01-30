import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;
import './layout.scss';
import { Theme, ThemePanel } from "@radix-ui/themes";


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <html lang={'en'}>
      <body className={`dark `}>
      AdminLayout
      <div className="layout">
        {children}
      </div>
      </body>
      </html>

  );
};

export default AdminLayout;
