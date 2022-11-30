import {ReactNode} from "react";
import ReduxProvider from "./components/providers/ReduxProvider";
import ThemeProvider from "./components/providers/ThemeProvider";
import { headers } from 'next/headers';


interface AppLayoutPropTypes {
    children: ReactNode
}

const RootLayout = ({children}: AppLayoutPropTypes)=> {
    const headersList = headers();
  return (
    <html>
      <head />
      <body>
          <ReduxProvider>
              <ThemeProvider>
                  {children}
              </ThemeProvider>
          </ReduxProvider>
      </body>
    </html>
  )
}


export default RootLayout;