import {FC} from "react";
import SideBarWidgetArea from './SidebarWidgetArea';
import {Widget} from "typescript-types";

interface SidebarWidgetAreaRendererPropTypes {
    sidebar:string|boolean|undefined
    position:string
    locale:string,
    leftSideWidgets:Widget[]
    rightSideWidgets:Widget[]
    dictionary: {
        [key: string]: string
    },
}

const SidebarWidgetAreaRenderer: FC<SidebarWidgetAreaRendererPropTypes> = ({leftSideWidgets,rightSideWidgets,sidebar,position,locale,dictionary}) => {

    return (
        <>
            {(sidebar === 'left' || sidebar === 'both') && <SideBarWidgetArea
                widgets={leftSideWidgets}
                dictionary={dictionary}
                locale={locale}
                gridArea='left-sidebar'
                className='left-sidebar'
                position={`${position}LeftSidebar`}
            />}
            {(sidebar === 'right' || sidebar === 'both') && <SideBarWidgetArea
                widgets={rightSideWidgets}
                dictionary={dictionary}
                locale={locale}
                gridArea='right-sidebar'
                className='right-sidebar'
                position={`${position}RightSidebar`}
            />}
        </>
    )
};
export default SidebarWidgetAreaRenderer
