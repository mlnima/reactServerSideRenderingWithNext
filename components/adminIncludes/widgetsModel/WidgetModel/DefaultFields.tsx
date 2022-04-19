import React, {FC, useEffect, useMemo} from "react";
import SelectFieldForWidget
    from "@components/adminIncludes/widgetsModel/WidgetModel/SelectFieldForWidget/SelectFieldForWidget";
import MonacoEditor from "@components/adminIncludes/MonacoEditor/MonacoEditor";
import {WidgetDataPropTypes} from "@_variables/TypeScriptTypes/Widgets";
import RenderTitleAndRedirectLink from './RenderTitleAndRedirectLink/RenderTitleAndRedirectLink'
import TextInputFieldForWidget
    from "@components/adminIncludes/widgetsModel/WidgetModel/TextInputFieldForWidget/TextInputFieldForWidget";
import {useSelector} from "react-redux";
import staticPositions from "@components/adminIncludes/widgetsModel/staticPositions";
import {flatMap} from "lodash";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

interface DefaultFieldsPropTypes {
    widgetData: WidgetDataPropTypes,
    widgetSettings: {
        customStyleBox: boolean,
        textBox: boolean,
        customScriptBox: boolean,
        activeEditingLanguage: string,
    },
    widgetId: string,
    onCheckboxChangeHandler: any,
    onTextInputsDataChangeHandler: any,
    onChangeLanguageHandler: any,
    onChangeHandler: any,
    setWidgetSettings: any,
}

const DefaultFields: FC<DefaultFieldsPropTypes> =
    ({
         widgetData,
         widgetId,
         widgetSettings,
         onCheckboxChangeHandler,
         onTextInputsDataChangeHandler,
         onChangeHandler,
         onChangeLanguageHandler,
         setWidgetSettings,
     }) => {
        const customPages = useSelector((store: StoreTypes) => store?.adminPanelGlobalState?.customPages)
        const positions = useMemo(() => {
            return [
                ...staticPositions,
                ...flatMap(customPages, (customPage => [customPage, customPage + 'LeftSidebar', customPage + 'RightSidebar']))
            ]
        }, [customPages])


        return (
            <>
                <div className='checkInputFieldForWidget widgetSection'>
                    <p>Edit Mode:</p>
                    <input type='checkbox' name='editMode' checked={widgetData.editMode}
                           onChange={e => onCheckboxChangeHandler(e)}/>
                </div>
                <div className='checkInputFieldForWidget widgetSection'>
                    <p>No SSR:</p>
                    <input type='checkbox' name='noSSR' checked={widgetData.noSSR}
                           onChange={e => onCheckboxChangeHandler(e)}/>
                </div>
                <div className='widgetInfo widgetSection'>
                    <p className='widget-info-id'>ID :</p>
                    <p>{widgetId}</p>
                </div>
                <TextInputFieldForWidget inputTitle='Name:' name='name' type='text' value={widgetData.name}
                                         placeHolder='name' onChangeHandler={e => onChangeHandler(e)}/>
                <TextInputFieldForWidget inputTitle='index:' name='widgetIndex' type='number'
                                         value={widgetData.widgetIndex} placeHolder='widgetIndex'
                                         onChangeHandler={e => onChangeHandler(e)}/>

                <SelectFieldForWidget title={'Translations:'}
                                      name={'activeEditingLanguage'}
                                      value={widgetSettings.activeEditingLanguage}
                                      options={[
                                          'default',
                                          ...process.env.NEXT_PUBLIC_LOCALS.split(' ')
                                              .filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL)
                                      ]}
                                      onChangeHandler={onChangeLanguageHandler}
                />

                <SelectFieldForWidget title={'Device Type To Render:'}
                                      name={'deviceTypeToRender'}
                                      value={widgetData.deviceTypeToRender}
                                      options={[ 'mobile', 'desktop']}
                                      onChangeHandler={onChangeHandler}
                />
                <SelectFieldForWidget title={'Specific Day Type To Render:'}
                                      name={'specificDayToRender'}
                                      value={widgetData.specificDayToRender}
                                      options={['all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
                                      onChangeHandler={onChangeHandler}
                />

                <SelectFieldForWidget title={'Language To Render:'}
                                      name={'languageToRender'}
                                      value={widgetData.languageToRender}
                                      options={['all', 'default', ...process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCAL)]}
                                      onChangeHandler={onChangeHandler}
                />

                <SelectFieldForWidget title={'Position:'}
                                      name={'position'}
                                      value={widgetData.position}
                                      options={positions}
                                      onChangeHandler={onChangeHandler}
                />

                <RenderTitleAndRedirectLink
                    widgetData={widgetData}
                    widgetSettings={widgetSettings}
                    onTextInputsDataChangeHandler={onTextInputsDataChangeHandler}
                    onChangeHandlerForBoolean={onChangeHandler}
                    rendering={
                        widgetData.type === 'posts' ||
                        widgetData.type === 'postsSwiper' ||
                        widgetData.type === 'imageSwiper' ||
                        widgetData.type === 'meta' ||
                        widgetData.type === 'metaWithImage' ||
                        widgetData.type === 'alphabeticalNumericalRange' ||
                        widgetData.type === 'text' ||
                        widgetData.type === 'textEditor' ||
                        widgetData.type === 'media' ||
                        widgetData.type === 'recentComments'}
                />


                <TextInputFieldForWidget inputTitle='Extra ClassName:' name='extraClassName' type='text'
                                         value={widgetData.extraClassName}
                                         placeHolder='Extra ClassName'
                                         onChangeHandler={onChangeHandler}/>

                <TextInputFieldForWidget inputTitle='Extra Id:' name='extraId' type='text'
                                         value={widgetData.extraId}
                                         placeHolder='Extra Id'
                                         onChangeHandler={onChangeHandler}/>
                <div className={'monaco-editor-section'}>
                    <div className={'editor-section'}>
                        <p>Widget Text or HTML</p>
                        <button className={'btn btn-primary'} onClick={() => setWidgetSettings({
                            ...widgetSettings,
                            textBox: !widgetSettings.textBox
                        })}
                        >
                            {widgetSettings.textBox ? 'close' : 'open'}
                        </button>
                    </div>
                    {widgetSettings.textBox ?
                        <MonacoEditor
                            language={'html'}
                            name={'text'}
                            defaultValue={
                                widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
                                    widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
                            }
                            value={
                                widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
                                    widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
                            }
                            className={'widgetTextTextarea'}
                            onChange={onTextInputsDataChangeHandler}
                        />
                        : null
                    }
                </div>

                <div className={'monaco-editor-section'}>
                    <div className={'editor-section'}>
                        <p>Custom Styles:</p>
                        <button className={'btn btn-primary'} onClick={() => setWidgetSettings({
                            ...widgetSettings,
                            customStyleBox: !widgetSettings.customStyleBox
                        })}>
                            {widgetSettings.customStyleBox ? 'close' : 'open'}
                        </button>
                    </div>
                    {widgetSettings?.customStyleBox ?
                        <MonacoEditor
                            language={'scss'}
                            name={'customStyles'}
                            defaultValue={widgetData.customStyles}
                            value={widgetData.customStyles}
                            className={'customStylesTextarea'}
                            onChange={onChangeHandler}
                        />
                        : null
                    }
                </div>

                <SelectFieldForWidget title={'Custom Script Strategy:'}
                                      name={'customScriptStrategy'}
                                      value={widgetData.customScriptStrategy}
                                      options={['lazyOnload', 'afterInteractive', 'beforeInteractive']}
                                      onChangeHandler={onChangeHandler}
                />

                <div className={'monaco-editor-section'}>

                    <div className={'editor-section'}>
                        <p>Custom Script:</p>
                        <button className={'btn btn-primary'}
                                onClick={() => setWidgetSettings({
                                    ...widgetSettings,
                                    customScriptBox: !widgetSettings.customScriptBox
                                })}>
                            {widgetSettings.customScriptBox ? 'close' : 'open'}
                        </button>
                    </div>

                    {widgetSettings.customScriptBox ?
                        <MonacoEditor
                            language={'javascript'}
                            name={'customScript'}
                            defaultValue={widgetData.customScript}
                            value={widgetData.customScript}
                            className={'customScriptTextarea'}
                            onChange={onChangeHandler}
                        />
                        : null
                    }

                </div>
            </>
        )
    };
export default DefaultFields
