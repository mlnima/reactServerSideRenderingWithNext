import {FC} from "react";
import SideBarWidgetArea from './SidebarWidgetArea';

interface SidebarWidgetAreaRendererPropTypes {
    sidebar:string|boolean
    position:string
}

const SidebarWidgetAreaRenderer: FC<SidebarWidgetAreaRendererPropTypes> = ({sidebar,position}) => {
    return (
        <>
            {(sidebar === 'left' || sidebar === 'both') && <SideBarWidgetArea
                gridArea='left-sidebar'
                className='left-sidebar'
                position={`${position}LeftSidebar`}
            />}
            {(sidebar === 'right' || sidebar === 'both') && <SideBarWidgetArea
                gridArea='right-sidebar'
                className='right-sidebar'
                position={`${position}RightSidebar`}
            />}
        </>
    )
};
export default SidebarWidgetAreaRenderer
