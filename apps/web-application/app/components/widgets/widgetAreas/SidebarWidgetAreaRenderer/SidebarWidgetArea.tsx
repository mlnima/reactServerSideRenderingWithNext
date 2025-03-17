import { FC } from 'react';
import React from 'react';
import { IWidget } from "@repo/typescript-types";
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';

interface SideBarWidgetAreaProps {
    className: string;
    position: string;
    gridArea: string;
    widgets: IWidget[];
    locale: string;
    dictionary: {
        [key: string]: string;
    };
}

const SidebarWidgetArea: FC<SideBarWidgetAreaProps> = ({
    dictionary,
    className,
    position,
    gridArea,
    widgets,
    locale,
}) => {
    return (
        <aside className={className + ' widget-area sidebarWidgetArea ' + position} style={{ gridArea }}>
            <WidgetsRenderer dictionary={dictionary} locale={locale} position={position} widgets={widgets} />
        </aside>
    );
};

export default SidebarWidgetArea;
