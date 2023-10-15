// @ts-nocheck
import React, {FC, useMemo} from "react";
import SelectFieldForWidget
    from "./SelectFieldForWidget/SelectFieldForWidget";
import MonacoEditor from "@components/common/MonacoEditor";
import RenderTitleAndRedirectLink from './RenderTitleAndRedirectLink/RenderTitleAndRedirectLink'
import TextInputFieldForWidget
    from "./TextInputFieldForWidget/TextInputFieldForWidget";
import {useSelector} from "react-redux";
import {widgetsStaticPositions} from "data-structures";
import {DashboardStore, Store} from "typescript-types";
import { WidgetSettingsPropTypes} from "typescript-types";

interface DefaultFieldsPropTypes {
    widgetData: any,
    setWidgetData: Function,
    widgetSettings: WidgetSettingsPropTypes,
    widgetId: string,
    onCheckboxChangeHandler: any,
    onChangeHandlerWithTranslate: any,
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
         onChangeHandlerWithTranslate,
         onChangeHandler,
         onChangeLanguageHandler,
         setWidgetSettings
     }) => {
        const customPages = useSelector(({globalState}: DashboardStore) => globalState?.customPages)
        const positions = useMemo(() => {
            return [
                ...widgetsStaticPositions,
                // ...flatMap(customPages, (customPage => [customPage, customPage + 'LeftSidebar', customPage + 'RightSidebar'])),
                ...customPages.flatMap((customPage => [customPage, customPage + 'LeftSidebar', customPage + 'RightSidebar']) ),
            ]
        }, [customPages])

        const onChangeWithTranslate = (name,value)=>{
            const e = {
                target:{
                    name,
                    value
                }
            }
            onChangeHandlerWithTranslate(e)
        }

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
                                          ...process.env?.NEXT_PUBLIC_LOCALES?.split(' ')
                                              .filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE)
                                      ]}
                                      onChangeHandler={onChangeLanguageHandler}
                />

                <SelectFieldForWidget title={'Device Type To Render:'}
                                      name={'deviceTypeToRender'}
                                      value={widgetData.deviceTypeToRender}
                                      options={['mobile', 'desktop']}
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
                                      options={['all', 'default', ...process.env?.NEXT_PUBLIC_LOCALES?.split(' ').filter(lang => lang !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE)]}
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
                    onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                    onChangeHandler={onChangeHandler}
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
                            activeEditingLanguage={widgetSettings.activeEditingLanguage}
                            defaultValue={
                                    widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
                                    widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
                            }
                            value={
                                    widgetSettings.activeEditingLanguage === 'default' ? widgetData.text :
                                    widgetData?.translations?.[widgetSettings.activeEditingLanguage]?.text
                            }
                            className={'widgetTextTextarea'}
                            onChange={onChangeHandlerWithTranslate}
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

                {/*<SelectFieldForWidget title={'Custom Script Strategy:'}*/}
                {/*                      name={'customScriptStrategy'}*/}
                {/*                      value={widgetData.customScriptStrategy}*/}
                {/*                      options={['lazyOnload', 'afterInteractive', 'beforeInteractive']}*/}
                {/*                      onChangeHandler={onChangeHandler}*/}
                {/*/>*/}

                {/*<div className={'monaco-editor-section'}>*/}

                {/*    <div className={'editor-section'}>*/}
                {/*        <p>Custom Script:</p>*/}
                {/*        <button className={'btn btn-primary'}*/}
                {/*                onClick={() => setWidgetSettings({*/}
                {/*                    ...widgetSettings,*/}
                {/*                    customScriptBox: !widgetSettings.customScriptBox*/}
                {/*                })}>*/}
                {/*            {widgetSettings.customScriptBox ? 'close' : 'open'}*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*    {widgetSettings.customScriptBox ?*/}
                {/*        <MonacoEditor*/}
                {/*            language={'javascript'}*/}
                {/*            name={'customScript'}*/}
                {/*            defaultValue={widgetData.customScript}*/}
                {/*            value={widgetData.customScript}*/}
                {/*            className={'customScriptTextarea'}*/}
                {/*            onChange={onChangeHandler}*/}

                {/*        />*/}
                {/*        : null*/}
                {/*    }*/}

                {/*</div>*/}
            </>
        )
    };
export default DefaultFields
