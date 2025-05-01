'use client';
import FilterEditingWidgets from '../FilterEditingWidgets/FilterEditingWidgets';
import AddWidgetMenu from '../AddWidgetMenu/AddWidgetMenu';
import WidgetPositionsWrapper from '../WidgetPositionsWrapper/WidgetPositionsWrapper';
import { IWidget, IWidgetData } from '@repo/typescript-types';
import { FC } from 'react';
import './EditWidgetsContent.scss';
import { useAppDispatch } from '@store/hooks';
import { useRouter } from 'next/navigation';
import dashboardCreateNewWidget from '@lib/actions/database/operations/widgets/dashboardCreateNewWidget';
import { setAlert } from '@store/reducers/globalStateReducer';

interface IProps {
  customPages: string[];
  availablePositions: string[];
  widgetsInGroups: {
    [key: string]: IWidget[]
  };
}


const EditWidgetsContent: FC<IProps> = ({ customPages, availablePositions, widgetsInGroups }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onCloneWidgetHandler = async (widgetData: IWidgetData) => {
    try {
      // you wrote total bullshit here
      //const widgetsInTheSamePosition = widgetsInGroups?.[widgetData.position]?.filter((widget: IWidget) => widget?.data?.position === widgetData.position);
      const widgetsInTheSamePosition = widgetsInGroups?.[widgetData.position];

      const highestIndexInTheSamePosition = Math.max(...widgetsInTheSamePosition.map(() => widgetData.widgetIndex), 0);
      const { success, message, error } = await dashboardCreateNewWidget({
        ...widgetData,
        widgetIndex: highestIndexInTheSamePosition + 1,
        posts: [],
        metaData: [],
      });

      if (!success) {
        console.log(`getPostsAction error=> `, error);
        dispatch(
          setAlert({
            message,
            type: 'Error',
          }),
        );
        return;
      }

      router.refresh();

    } catch (error) {
      dispatch(
        setAlert({
          message:'Error on onCloneWidgetHandler',
          type: 'Error',
          error
        }),
      );
    }
  };


  return (
    <div id={'editWidgetsPage'} className="admin-widgets-page">
      <h1>Widgets Settings</h1>
      <div className="widget-setting">
        <h2>Add New Widget:</h2>
        <div className="top-panel">
          <AddWidgetMenu customPages={customPages} widgetsInGroups={widgetsInGroups} />
        </div>
        <div className={'filter-positions'}>
          <h2>Filter Position:</h2>
          <FilterEditingWidgets availablePositions={availablePositions} />
        </div>
        <h2>Widgets:</h2>
        <WidgetPositionsWrapper widgetsInGroups={widgetsInGroups}
                                customPages={customPages}
                                onCloneWidgetHandler={onCloneWidgetHandler}
                                availablePositions={availablePositions} />
      </div>
    </div>
  );
};


export default EditWidgetsContent;
