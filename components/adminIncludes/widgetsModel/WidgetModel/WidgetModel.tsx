import React, {FC, useEffect, useState} from 'react';
import MonacoEditor from "../../MonacoEditor/MonacoEditor";
import DefaultFields from "@components/adminIncludes/widgetsModel/WidgetModel/DefaultFields";
import {WidgetModelStyledDiv} from './WidgetModelStyle'
import ActionButtons from "@components/adminIncludes/widgetsModel/WidgetModel/ActionButtons";
import UniqueFields from "@components/adminIncludes/widgetsModel/WidgetModel/UniqueFields";
import WidgetHeaderControl from "./WidgetHeaderControl/WidgetHeaderControl";
import { WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";
import {onChangeInputValueCorrector} from "@_variables/_variables";
import {useAppDispatch} from "@store_toolkit/hooks";
import {fetchAdminPanelUpdateWidget} from "@store_toolkit/adminReducers/adminWidgetsReducer";

interface WidgetModelPropTypes {
    widget:WidgetPropTypes
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
        setWidgetSettings({
            ...widgetSettings,
            activeEditingLanguage: e.target.value
        })
    }

    const onChangeHandler = e => {
        const value =  onChangeInputValueCorrector(e)
        setWidgetData({
            ...widgetData,
            [e.target.name]: value
        })
    };

    // const onTextInputsDataChangeHandler = (e) => {
    //     if (widgetSettings.activeEditingLanguage === 'default') {
    //         onChangeHandler(e)
    //     } else {
    //         const value =   onChangeInputValueCorrector(e)
    //         setWidgetData({
    //             ...widgetData,
    //             translations:{
    //                 ...(widgetData?.translations || {}),
    //                 [widgetSettings.activeEditingLanguage]:{
    //                     ...(widgetData?.translations?.[widgetSettings.activeEditingLanguage] || {}),
    //                     [e.target.name]: value
    //                 }
    //             }
    //         })
    //     }
    // }
    const onChangeHandlerWithTranslate = (e) => {
        if (widgetSettings.activeEditingLanguage === 'default') {
            onChangeHandler(e)
        } else {
            const value =   onChangeInputValueCorrector(e)
            setWidgetData({
                ...widgetData,
                translations:{
                    ...(widgetData?.translations || {}),
                    [widgetSettings.activeEditingLanguage]:{
                        ...(widgetData?.translations?.[widgetSettings.activeEditingLanguage] || {}),
                        [e.target.name]: value
                    }
                }
            })
        }
    }

    const onObjectEditingModeChangeHandler = e => {
        setWidgetData(JSON.parse(e.target.value))
    }

    const onCheckboxChangeHandler = e => {
        setWidgetData({
            ...widgetData,
            [e.target.name]: e.target.checked
        })
    }




    const onUniqueDataChangeHandler = (e) => {
        const value =  onChangeInputValueCorrector(e)

        setWidgetData({
            ...widgetData,
            uniqueData: {
                ...(widgetData?.uniqueData || {}),
                [e.target.name]: value
            }
        })
    }

    const onUniqueDataChangeHandlerWithTranslate = (e) => {
        const value =  onChangeInputValueCorrector(e)
        if (widgetSettings.activeEditingLanguage === 'default'){
            onUniqueDataChangeHandler(e)
        }else{

            setWidgetData({
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    translations:{
                        //@ts-ignore
                        ...(widgetData?.uniqueData?.translations || {}),
                        [widgetSettings.activeEditingLanguage]:{
                            //@ts-ignore
                            ...(widgetData?.uniqueData?.translations?.[widgetSettings.activeEditingLanguage] || {}),
                            [e.target.name]: value
                        }

                    }

                }
            })
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
        dispatch(fetchAdminPanelUpdateWidget({
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
        dispatch(fetchAdminPanelUpdateWidget({
            _id: widget._id,
            data: {
                ...widgetData,
                stayOpen: !widgetData.stayOpen,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
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
