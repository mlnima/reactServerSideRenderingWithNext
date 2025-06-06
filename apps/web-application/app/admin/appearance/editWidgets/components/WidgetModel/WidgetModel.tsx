import React, { FC, useEffect, useState } from 'react';
import MonacoEditor from '@components/textEditors/MonacoEditor';
import DefaultFields from './DefaultFields';
import { WidgetModelStyledDiv } from './WidgetModel.style';
import ActionButtons from './ActionButtons';
import UniqueFields from './UniqueFields';
import WidgetHeaderControl from './WidgetHeaderControl/WidgetHeaderControl';
import { IWidget } from '@repo/typescript-types';
import { useAppDispatch } from '@store/hooks';
import { inputValueSimplifier } from '@repo/utils';
import dashboardUpdateWidget from '@lib/actions/database/widgets/dashboardUpdateWidget';
import { setAlert } from '@store/reducers/globalStateReducer';

interface WidgetModelPropTypes {
  widget: IWidget;
  customPages:string[]
  onCloneWidgetHandler:Function
}

const WidgetModel: FC<WidgetModelPropTypes> = ({ widget ,customPages,onCloneWidgetHandler}) => {
  const dispatch = useAppDispatch();

  const [widgetSettings, setWidgetSettings] = useState({
    open: false,
    textBox: false,
    customStyleBox: false,
    customScriptBox: false,
    objectEditingMode: false,
    renderDeleteBtn: false,
    activeEditingLanguage: 'default',
  });

  const [widgetData, setWidgetData] = useState({
    translations: {},
    uniqueData: {},
    widgetIndex: 0,
    stayOpen: false,
  });

  useEffect(() => {
    if (widget) {
      setWidgetData({
        ...widgetData,
        ...widget?.data,
      });
    }
  }, [widget]);

  const onChangeLanguageHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setWidgetSettings(prevState => ({
      ...prevState,
      activeEditingLanguage: e.target.value,
    }));
  };

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {name:string}>) => {
    const value = inputValueSimplifier(e);
    setWidgetData(prevState => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  // useEffect(() => {
  //     console.log(widgetData)
  // }, [widgetData]);

  const onChangeHandlerWithTranslate = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (widgetSettings.activeEditingLanguage === 'default') {
      onChangeHandler(e);
    } else {

      setWidgetData(prevState => {
        // @ts-expect-error: it's fine
        if (!prevState || prevState.translations?.[widgetSettings?.activeEditingLanguage]) return prevState;
        return {
          ...prevState,
          translations: {
            ...(prevState?.translations || {}),
            [widgetSettings.activeEditingLanguage]: {
              // @ts-expect-error: it's fine
              ...(prevState?.translations?.[widgetSettings.activeEditingLanguage] || {}),
              [e.target.name]: e.target.value,
            },
          },
        }
      });
    }
  };

  const onObjectEditingModeChangeHandler = (e:{target:{value:string}}) => {
    setWidgetData(JSON.parse(e.target.value));
  };

  const onCheckboxChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setWidgetData(prevState => (
      {
        ...prevState,
        [e.target.name]: e.target.checked,
      }
    ));
  };

  const onUniqueDataChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {name:string}>) => {
    const value = inputValueSimplifier(e);

    setWidgetData(prevState => ({
      ...prevState,
      uniqueData: {
        ...(prevState?.uniqueData || {}),
        [e.target.name]: value,
      },
    }));
  };

  const onUniqueDataChangeHandlerWithTranslate = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {name:string}>) => {
    const value = inputValueSimplifier(e);
    if (widgetSettings.activeEditingLanguage === 'default') {
      onUniqueDataChangeHandler(e);
    } else {

      // setWidgetData({
      //     ...widgetData,
      //     uniqueData: {
      //         ...(widgetData?.uniqueData || {}),
      //         translations: {
      //             //@ts-ignore
      //             ...(widgetData?.uniqueData?.translations || {}),
      //             [widgetSettings.activeEditingLanguage]: {
      //                 //@ts-ignore
      //                 ...(widgetData?.uniqueData?.translations?.[widgetSettings.activeEditingLanguage] || {}),
      //                 [e.target.name]: value
      //             }
      //
      //         }
      //
      //     }
      // })


      setWidgetData(prevState => ({
        ...prevState,
        uniqueData: {
          ...(prevState?.uniqueData || {}),
          translations: {
            //@ts-ignore
            ...(prevState?.uniqueData?.translations || {}),
            [widgetSettings.activeEditingLanguage]: {
              //@ts-ignore
              ...(prevState?.uniqueData?.translations?.[widgetSettings.activeEditingLanguage] || {}),
              [e.target.name]: value,
            },

          },
        },
      }));

    }
  };

  const onUniqueDataJsonChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {name:string,value:string}>) => {
    const parseJsonData = JSON?.parse(e.target.value);
    if (parseJsonData) {
      for (const property in parseJsonData) {
        if (parseJsonData[property] === 'true') {
          parseJsonData[property] = property === 'true';
        }
      }
    }
    setWidgetData({
      ...widgetData,
      uniqueData: {
        ...(widgetData.uniqueData || {}),
        [e.target.name]: parseJsonData,
      },
    });
  };

  const changeWidgetIndex = async (action:boolean) => {
    const valueToSet = action ? widgetData.widgetIndex + 1 : widgetData.widgetIndex - 1;

    const { success, message, error, data } = await dashboardUpdateWidget({
      _id: widget._id,
      data: {
        ...widgetData,
        widgetIndex: valueToSet,
        uniqueData: {
          ...(widgetData?.uniqueData || {}),
          posts: [],
          metaData: []
        }
      }
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


    setWidgetData({
      ...widgetData,
      widgetIndex: valueToSet,
    });

    //router.refresh();
  };

  const onLockHandler =async () => {

    const { success, message, error } = await dashboardUpdateWidget({
      _id: widget._id,
      data: {
        ...widgetData,
        stayOpen: !widgetData.stayOpen,
        uniqueData: {
          ...(widgetData?.uniqueData || {}),
          categoriesDataWithPosts: [],
          tagsDataWithPosts: [],
          ActorsDataWithPosts: [],
          posts: [],
          metaData: [],
        },
      },
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

    //
    // setWidgetData({
    //   ...widgetData,
    //   widgetIndex: valueToSet,
    // });
    //
    // dispatch(updateWidgetAction({
    //   _id: widget._id,
    //   data: {
    //     ...widgetData,
    //     stayOpen: !widgetData.stayOpen,
    //     uniqueData: {
    //       ...(widgetData?.uniqueData || {}),
    //       categoriesDataWithPosts: [],
    //       tagsDataWithPosts: [],
    //       ActorsDataWithPosts: [],
    //       posts: [],
    //       metaData: [],
    //     },
    //   },
    // }));

    setWidgetData({ ...widgetData, stayOpen: !widgetData.stayOpen });
  };

  return (
    <WidgetModelStyledDiv className="widget-model">
      <WidgetHeaderControl setKey={false}
                           widgetSettings={widgetSettings}
                           widgetId={widget._id}
                           widgetData={widgetData}
                           onObjectModeHandler={() =>
                             setWidgetSettings({
                               ...widgetSettings,
                               objectEditingMode: !widgetSettings.objectEditingMode,
                             })}
                           onLockHandler={onLockHandler}
                           changeWidgetIndex={changeWidgetIndex}
      />


      {widgetData.stayOpen && widgetSettings.objectEditingMode ?

        <MonacoEditor
          language={'json'}
          name={'widgetData'}
          height={1024}
          width={800}
          defaultValue={JSON.stringify(widgetData, null, '\t')}
          value={JSON.stringify(widgetData, null, '\t')}
          className={'objectEditingModeEditor'}
          onParentChangeHandler={onObjectEditingModeChangeHandler}
        />
        : null
      }

      {widgetData.stayOpen && !widgetSettings.objectEditingMode ?

        <div className="widgetModel">

          <DefaultFields widgetData={widgetData}
                         customPages={customPages}
                         setWidgetData={setWidgetData}
                         widgetSettings={widgetSettings}
                         onCheckboxChangeHandler={onCheckboxChangeHandler}
                         onChangeHandler={onChangeHandler}
                         onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                         onChangeLanguageHandler={onChangeLanguageHandler}
                         setWidgetSettings={setWidgetSettings}
                         widgetId={widget._id}

          />

          <UniqueFields widgetData={widgetData}
                        widgetId={widget._id}
                        widgetSettings={widgetSettings}
                        setWidgetSettings={setWidgetSettings}
                        setWidgetData={setWidgetData}
                        onChangeHandler={onChangeHandler}
                        onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                        onUniqueDataChangeHandlerWithTranslate={onUniqueDataChangeHandlerWithTranslate}
                        onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                        onUniqueDataJsonChangeHandler={onUniqueDataJsonChangeHandler}
                        onCheckboxChangeHandler={onCheckboxChangeHandler}
          />

        </div>
        : null
      }

      {widgetData.stayOpen ?
        <ActionButtons widgetData={widgetData}
                       onCloneWidgetHandler={onCloneWidgetHandler}
                       widgetId={widget._id}
                       position={widget.data.position}
                       widgetSettings={widgetSettings}
                       setWidgetSettings={setWidgetSettings}
        />
        : null
      }

    </WidgetModelStyledDiv>
  );

};
export default WidgetModel;
