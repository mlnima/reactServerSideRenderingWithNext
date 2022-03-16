import {FC} from "react";
import {useMemo} from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {checkRouteAndSetLoading} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {MenuItem} from "@_variables/TypeScriptTypes/WidgetsInterfaces";
import dynamic from "next/dynamic";

const DesktopMenuWidget = dynamic(() => import('./DesktopMenuWidget/DesktopMenuWidget'));
const MobileMenuWidget = dynamic(() => import('./MobileMenuWidget/MobileMenuWidget'));

interface MenuWidgetPropTypes {
    menuItems: MenuItem[]
}

const MenuWidget: FC<MenuWidgetPropTypes> = ({menuItems}) => {

    const dispatch = useDispatch()

    const isMobile = useSelector((store: StoreTypes) => store.settings?.isMobile);

    const {asPath} = useRouter()

    const mobileNavigationOnClickHandler = (nextPath) => {
        dispatch(checkRouteAndSetLoading(asPath, nextPath))
    }

    const menuItemsInOrder = useMemo(() => {
        return menuItems.filter((menuItem: MenuItem) => !menuItem.parent)
                        .sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || [];
    }, [])


    if (!isMobile){
        return <DesktopMenuWidget menuItemsInOrder={menuItemsInOrder} mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}/>
    }else {
        return <MobileMenuWidget menuItemsInOrder={menuItemsInOrder} mobileNavigationOnClickHandler={mobileNavigationOnClickHandler}/>
    }

};
export default MenuWidget;



