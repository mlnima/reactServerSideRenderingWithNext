import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import MonacoEditor from "../../MonacoEditor/MonacoEditor";
import DefaultFields from "@components/adminIncludes/widgetsModel/WidgetModel/DefaultFields";
import {WidgetModelStyledDiv} from './WidgetModelStyle'
import ActionButtons from "@components/adminIncludes/widgetsModel/WidgetModel/ActionButtons";
import UniqueFields from "@components/adminIncludes/widgetsModel/WidgetModel/UniqueFields";
import WidgetHeaderControl from "./WidgetHeaderControl/WidgetHeaderControl";
import {adminUpdateWidget} from "@store/adminActions/adminWidgetsActions";
import {WidgetDataPropTypes, WidgetPropTypes} from "@_variables/TypeScriptTypes/Widgets";

interface WidgetModelPropTypes {
    widgetId: string,
    widget:WidgetPropTypes
}

const WidgetModel: FC<WidgetModelPropTypes> = ({widgetId,widget}) => {
    const dispatch = useDispatch()

    const [widgetSettings, setWidgetSettings] = useState({
        open: false,
        textBox: false,
        customStyleBox: false,
        customScriptBox: false,
        objectEditingMode: false,
        renderDeleteBtn: false,
        activeEditingLanguage: 'default'
    })

    const [widgetData, setWidgetData] = useState<WidgetDataPropTypes>({
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

    // useEffect(() => {
    //     if (currentWidgetData) {
    //         setWidgetData({
    //             ...widgetData,
    //             ...currentWidgetData?.data,
    //         })
    //     }
    // }, [currentWidgetData]);

    const onChangeLanguageHandler = e => {
        setWidgetSettings({
            ...widgetSettings,
            activeEditingLanguage: e.target.value
        })
    }

    const onTextInputsDataChangeHandler = (e) => {

        if (widgetSettings.activeEditingLanguage === 'default') {
            setWidgetData({
                ...widgetData,
                [e.target.name]: e.target.value
            })
        } else {
            const currentData = widgetData.translations ?
                widgetData.translations[widgetSettings.activeEditingLanguage] ?
                    widgetData :
                    {
                        ...widgetData,
                        translations: {
                            ...widgetData.translations,
                            [widgetSettings.activeEditingLanguage]: {}
                        }
                    }
                : {
                    ...widgetData,
                    translations: {
                        [widgetSettings.activeEditingLanguage]: {}
                    }
                }

            setWidgetData({
                ...currentData,
                translations: {
                    ...currentData.translations,
                    [widgetSettings.activeEditingLanguage]: {
                        ...currentData.translations[widgetSettings.activeEditingLanguage],
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }

    const onObjectEditingModeChangeHandler = e => {
        setWidgetData(JSON.parse(e.target.value))
    }


    const onChangeHandler = e => {
        const value = e.target.value
        setWidgetData({
            ...widgetData,
            [e.target.name]: value === 'true' ? true : value === 'false' ? false : value
        })
    };


    const onUniqueDataChangeHandler = (e) => {
        const value = e.target.value === 'true' || e.target.value === 'false' ? e.target.value === 'true' : e.target.value

        setWidgetData({
            ...widgetData,
            uniqueData: {
                ...(widgetData?.uniqueData || {}),
                [e.target.name]: value
            }
        })
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

    const onCheckboxChangeHandler = e => {
        setWidgetData({
            ...widgetData,
            [e.target.name]: e.target.checked
        })
    }


    const changeWidgetIndex = (action) => {
        const valueToSet = action ? widgetData.widgetIndex + 1 : widgetData.widgetIndex - 1;
        dispatch(adminUpdateWidget({
            _id: widgetId,
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
        dispatch(adminUpdateWidget({
            _id: widgetId,
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
                                 widgetId={widgetId}
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
                                   onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                                   onChangeLanguageHandler={onChangeLanguageHandler}
                                   setWidgetSettings={setWidgetSettings}
                                   widgetId={widgetId}

                    />

                    <UniqueFields widgetData={widgetData}
                                  widgetId={widgetId}
                                  widgetSettings={widgetSettings}
                                  setWidgetSettings={setWidgetSettings}
                                  setWidgetData={setWidgetData}
                                  onChangeHandler={onChangeHandler}
                                  onUniqueDataChangeHandler={onUniqueDataChangeHandler}
                                  onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                                  onUniqueDataJsonChangeHandler={onUniqueDataJsonChangeHandler}
                                  onCheckboxChangeHandler={onCheckboxChangeHandler}
                    />

                </div>
                : null
            }

            {widgetData.stayOpen ?
                <ActionButtons widgetData={widgetData}
                               widgetId={widgetId}
                               widgetSettings={widgetSettings}
                               setWidgetSettings={setWidgetSettings}
                />
                : null
            }

        </WidgetModelStyledDiv>
    );

};
export default WidgetModel;
