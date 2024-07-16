import { FC } from 'react';
import React from 'react';
import { Widget } from 'typescript-types';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';

interface SideBarWidgetAreaProps {
    className: string;
    position: string;
    gridArea: string;
    widgets: Widget[];
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
