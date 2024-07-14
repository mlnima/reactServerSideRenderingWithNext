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
    postSettings: {
        [key: string]: string;
    };
}

const SidebarWidgetArea: FC<SideBarWidgetAreaProps> = ({
    dictionary,
    locale,
    className,
    position,
    gridArea,
    widgets,
    postSettings,
}) => {
    return (
        <aside className={className + ' widget-area sidebarWidgetArea ' + position} style={{ gridArea }}>
            <WidgetsRenderer
                postSettings={postSettings}
                dictionary={dictionary}
                locale={locale}
                position={position}
                widgets={widgets}
            />
        </aside>
    );
};

export default SidebarWidgetArea;
