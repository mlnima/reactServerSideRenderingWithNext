'use client';
import React, { FC } from 'react';
import ExportWidget from './ExportWidget/ExportWidget';
import { useAppDispatch } from '@store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faClone } from '@fortawesome/free-solid-svg-icons/faClone';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useRouter } from 'next/navigation';
import { setAlert } from '@store/reducers/globalStateReducer';
import dashboardRemoveWidget from '@lib/actions/database/operations/widgets/dashboardRemoveWidget';
import dashboardUpdateWidget from '@lib/actions/database/operations/widgets/dashboardUpdateWidget';


interface ActionButtonsPropTypes {
  widgetData: any,
  widgetSettings: any,
  setWidgetSettings: any,
  widgetId: string
  onCloneWidgetHandler:Function
}

const ActionButtons: FC<ActionButtonsPropTypes> = ({ widgetData, widgetId, widgetSettings, setWidgetSettings,onCloneWidgetHandler }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSaveHandler = async () => {

    const { success, message, error,data } = await dashboardUpdateWidget({
      _id: widgetId,
      data: {
        ...widgetData,
        uniqueData: {
          ...widgetData.uniqueData,
          categoriesDataWithPosts: [],
          tagsDataWithPosts: [],
          ActorsDataWithPosts: [],
          posts: [],
          metaData: [],
        },
        posts: [],
        metaData: [],
      },
    });

    if (!success ) {
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
  };

  const onDeleteHandler = async () => {
    if (widgetId) {

      await dashboardRemoveWidget(widgetId);
      router.refresh();
    }
  };

  return (
    <div className="control-buttons">
      <button className={'btn btn-primary'} title="save" onClick={() => onSaveHandler()}>
        <FontAwesomeIcon icon={faFloppyDisk} className={'meta-icon'} />
      </button>

      <ExportWidget widgetData={widgetData} />
      <button className={'btn btn-primary'} title="clone" onClick={() => onCloneWidgetHandler(widgetData)}>
        <FontAwesomeIcon icon={faClone} className={'meta-icon'} />
      </button>
      <button className={'btn btn-primary'} title="delete"
              onClick={() => widgetSettings.renderDeleteBtn ? setWidgetSettings({
                ...widgetSettings,
                renderDeleteBtn: false,
              }) : setWidgetSettings({
                ...widgetSettings,
                renderDeleteBtn: true,
              })}>
        <FontAwesomeIcon icon={faTrash} className={'meta-icon'} />
      </button>
      {widgetSettings.renderDeleteBtn ?
        <button className={'btn btn-danger'} onClick={() => onDeleteHandler()}>
          Delete
        </button>
        : null
      }
    </div>
  );
};
export default ActionButtons;
