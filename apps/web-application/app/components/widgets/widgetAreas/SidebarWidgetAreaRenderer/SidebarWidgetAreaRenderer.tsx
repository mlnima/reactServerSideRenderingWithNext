import { FC } from 'react';
import SideBarWidgetArea from './SidebarWidgetArea';
import { IContentSettings, IWidget } from '@repo/typescript-types';

interface SidebarWidgetAreaRendererPropTypes {
  sidebar: string | boolean | undefined
  position: string
  leftSideWidgets: IWidget[]
  rightSideWidgets: IWidget[]
  dictionary: {
    [key: string]: string
  },
  locale: string,
  contentSettings?: IContentSettings;
}

const SidebarWidgetAreaRenderer: FC<SidebarWidgetAreaRendererPropTypes> = (
  {
    leftSideWidgets,
    rightSideWidgets,
    sidebar,
    position,
    dictionary,
    locale,
    contentSettings,
  }) => {

  return (
    <>
      {
        (sidebar === 'left' || sidebar === 'both') &&
        <SideBarWidgetArea
          widgets={leftSideWidgets}
          dictionary={dictionary}
          locale={locale}
          gridArea="left-sidebar"
          className="left-sidebar"
          position={`${position}LeftSidebar`}
          contentSettings={contentSettings}
        />
      }
      {
        (sidebar === 'right' || sidebar === 'both') &&
        <SideBarWidgetArea

          widgets={rightSideWidgets}
          dictionary={dictionary}
          locale={locale}
          gridArea="right-sidebar"
          className="right-sidebar"
          position={`${position}RightSidebar`}
          contentSettings={contentSettings}

        />
      }
    </>
  );
};
export default SidebarWidgetAreaRenderer;
