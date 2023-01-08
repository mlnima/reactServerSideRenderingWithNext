import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import dynamic from "next/dynamic";

const HeaderWidgetArea = dynamic(() => import('../../../widgetsArea/HeaderWidgetArea/HeaderWidgetArea'));
const TopBarWidgetArea = dynamic(() => import('../../../widgetsArea/TopBarWidgetArea/TopBarWidgetArea'));
const NavigationWidgetArea = dynamic(() => import('../../../widgetsArea/NavigationWidgetArea/NavigationWidgetArea'));

const AppLayoutHeader = ({}) => {

    const identity = useSelector(({settings}: Store) => settings.identity)

    return (
        <header>
            {(identity?.topbar === 'enable' || identity?.topbar === undefined) && <TopBarWidgetArea/>}
            {(identity?.header === 'enable' || identity?.header === undefined) && <HeaderWidgetArea/>}
            {(identity?.navigation === 'enable' || identity?.navigation === undefined) && <NavigationWidgetArea/>}
        </header>
    )

};
export default AppLayoutHeader;