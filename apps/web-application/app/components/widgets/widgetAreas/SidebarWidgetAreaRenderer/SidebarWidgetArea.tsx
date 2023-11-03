import {FC,} from "react";
import React from "react";
import {Widget} from "typescript-types";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";

interface SideBarWidgetAreaProps {
    className: string;
    position: string;
    gridArea:string;
    widgets:Widget[]
    locale:string,
    dictionary: {
        [key: string]: string
    },
}

const SidebarWidgetArea:FC<SideBarWidgetAreaProps> = ({dictionary,locale,className,position,gridArea,widgets}) => {
    return (
        <aside className={className + ' widget-area custom-scroll sidebarWidgetArea ' + position}
               style={{gridArea}}>
            <WidgetsRenderer dictionary={dictionary} locale={locale} position={position} widgets={widgets}/>
        </aside>
    );
};

export default SidebarWidgetArea;
