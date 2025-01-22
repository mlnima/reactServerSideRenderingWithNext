// @ts-nocheck
import React, {FC, useEffect, useState} from 'react';
import MonacoEditor from "@components/common/MonacoEditor";
import DefaultFields from "./DefaultFields";
import {WidgetModelStyledDiv} from './WidgetModel.style'
import ActionButtons from "./ActionButtons";
import UniqueFields from "./UniqueFields";
import WidgetHeaderControl from "./WidgetHeaderControl/WidgetHeaderControl";
import {Widget} from "@repo/typescript-types";
import {useAppDispatch} from "@store/hooks";
import {updateWidgetAction} from "@store/reducers/widgetsReducer";
import {inputValueSimplifier} from "@repo/utils";
import { isNumericString } from '@repo/utils';

interface WidgetModelPropTypes {
    widget: Widget
}

const WidgetModel: FC<WidgetModelPropTypes> = ({widget}) => {
    const dispatch = useAppDispatch()

    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        textBox: false,
        customStyleBox: false,
        customScriptBox: false,
        objectEditingMode: false,
        renderDeleteBtn: false,
        activeEditingLanguage: 'default'
    })

    const [widgetData, setWidgetData] = useState({
        translations: {},
        uniqueData: {},
        widgetIndex: 0,
        stayOpen: false,
    })

    useEffect(() => {
        if (widget) {
            setWidgetData({
                ...widgetData,
                ...widget?.data,
            })
        }
    }, [widget]);

    const onChangeLanguageHandler = e => {
        setWidgetSettings(prevState => ({
            ...prevState,
            activeEditingLanguage: e.target.value
        }))
    }

    const onChangeHandler = e => {
        const value = inputValueSimplifier(e)
        setWidgetData(prevState => ({
            ...prevState,
            [e.target.name]: value
        }))
    };

    // useEffect(() => {
    //     console.log(widgetData)
    // }, [widgetData]);

    const onChangeHandlerWithTranslate = (e) => {
        if (widgetSettings.activeEditingLanguage === 'default') {
            onChangeHandler(e)
        } else {
            setWidgetData(prevState => (
                {
                    ...prevState,
                    translations: {
                        ...(widgetData?.translations || {}),
                        [widgetSettings.activeEditingLanguage]: {
                            ...(widgetData?.translations?.[widgetSettings.activeEditingLanguage] || {}),
                            [e.target.name]: e.target.value
                        }
                    }
                }
            ))
        }
    }

    const onObjectEditingModeChangeHandler = e => {
        setWidgetData(JSON.parse(e.target.value))
    }

    const onCheckboxChangeHandler = e => {
        setWidgetData(prevState => (
            {
                ...prevState,
                [e.target.name]: e.target.checked
            }
        ))
    }

    const onUniqueDataChangeHandler = (e) => {
        const value = inputValueSimplifier(e)

        setWidgetData(prevState => ({
            ...prevState,
            uniqueData: {
                ...(prevState?.uniqueData || {}),
                [e.target.name]: value
            }
        }))
    }

    const onUniqueDataChangeHandlerWithTranslate = (e) => {
        const value = inputValueSimplifier(e)
        if (widgetSettings.activeEditingLanguage === 'default') {
            onUniqueDataChangeHandler(e)
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
                            [e.target.name]: value
                        }

                    }
                }
            }))

        }
    }

    const onUniqueDataJsonChangeHandler = (e) => {
        const parseJsonData = JSON?.parse(e.target.value)
        if (parseJsonData) {
            for (const property in parseJsonData) {
                if (parseJsonData[property] === 'true') {
                    parseJsonData[property] = property === 'true'
                }
            }
        }
        setWidgetData({
            ...widgetData,
            uniqueData: {
                ...(widgetData.uniqueData || {}),
                [e.target.name]: parseJsonData,
            }
        })
    }

    const changeWidgetIndex = (action) => {
        const valueToSet = action ? widgetData.widgetIndex + 1 : widgetData.widgetIndex - 1;
        dispatch(updateWidgetAction({
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
        }))
        setWidgetData({
            ...widgetData,
            widgetIndex: valueToSet,
        })

    };

    const onLockHandler = () => {
        dispatch(updateWidgetAction({
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
                    metaData: []
                }
            }
        }))

        setWidgetData({...widgetData, stayOpen: !widgetData.stayOpen})
    };

    return (
        <WidgetModelStyledDiv className='widget-model'>
            <WidgetHeaderControl setKey={false}
                                 widgetSettings={widgetSettings}
                                 widgetId={widget._id}
                                 widgetData={widgetData}
                                 onObjectModeHandler={() =>
                                     setWidgetSettings({
                                         ...widgetSettings,
                                         objectEditingMode: !widgetSettings.objectEditingMode
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
                    onChange={onObjectEditingModeChangeHandler}
                />
                : null
            }

            {widgetData.stayOpen && !widgetSettings.objectEditingMode ?

                <div className='widgetModel'>

                    <DefaultFields widgetData={widgetData}
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
                               widgetId={widget._id}
                               widgetSettings={widgetSettings}
                               setWidgetSettings={setWidgetSettings}
                />
                : null
            }

        </WidgetModelStyledDiv>
    );

};
export default WidgetModel;
