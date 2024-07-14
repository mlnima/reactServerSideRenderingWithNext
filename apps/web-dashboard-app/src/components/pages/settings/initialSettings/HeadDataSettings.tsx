import React, {FC, useState} from "react";
import styled from "styled-components";
import { InitialSettings} from "typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const Style = styled.div``;

interface PropTypes {
    language:string,
    onChangeHandler:Function,
    onChangeHandlerWithTranslation:Function,
    initialSettingsData:InitialSettings
}

const HeadDataSettings: FC<PropTypes> = ({onChangeHandler,onChangeHandlerWithTranslation,initialSettingsData,language}) => {
    const [isHeadTagsEditorOpen,setIsHeadTagsEditorOpen] = useState(false)
    const [is3rdPartyScriptEditorOpen,setIs3rdPartyScriptEditorOpen] = useState(false)
    return (
        <Style className={'setting-section'}>

            <div className={'field'}>
                <h2>Head Data Settings:</h2>
            </div>


            <div className="inputField">
                <p>Google Analytics Id:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'googleAnalyticsId'}
                       value={initialSettingsData?.headDataSettings?.googleAnalyticsId}
                       className={'primaryInput'}/>

            </div>
            <div className="inputField">
                <p>Keywords:</p>
                <input onChange={e => onChangeHandlerWithTranslation(e, 'headDataSettings')}
                       name={'keywords'}
                       value={language === 'default' ? initialSettingsData?.headDataSettings?.keywords :
                           initialSettingsData?.headDataSettings?.translations?.[language]?.keywords || ''}
                       className={'primaryInput'}/>

            </div>
            <div className="inputField">
                <p>Title:</p>
                <input onChange={e => onChangeHandlerWithTranslation(e, 'headDataSettings')}
                       name={'title'}
                       value={language === 'default' ? initialSettingsData?.headDataSettings?.title :
                           initialSettingsData?.headDataSettings?.translations?.[language]?.title || ''}
                       className={'primaryInput'}/>

            </div>
            <div className="inputField">
                <p>Description:</p>
                <textarea onChange={e => onChangeHandlerWithTranslation(e, 'headDataSettings')}
                          name={'description'}
                          value={language === 'default' ? initialSettingsData?.headDataSettings?.description :
                              initialSettingsData?.headDataSettings?.translations?.[language]?.description || ''}
                          className={'primaryInput'}/>

            </div>
            <div className="inputField">

                <p>Site Name:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'siteName'}
                       value={initialSettingsData?.headDataSettings?.siteName}
                       className={'primaryInput'}/>
            </div>
            <div className="inputField">
                <p>Theme Color:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'themeColor'}
                       value={initialSettingsData?.headDataSettings?.themeColor}
                       className={'primaryInput'}/>

            </div>
            <div className="inputField">
                <p>Fav Icon Url:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'favIconUrl'}
                       value={initialSettingsData?.headDataSettings?.favIconUrl}
                       className={'primaryInput'}/>

            </div>













            <div className={'field'}>

                <p>Custom Head Tags:</p>
                <button className={'btn btn-dark'} onClick={()=>setIsHeadTagsEditorOpen(!isHeadTagsEditorOpen)}>
                    Head Tags Editor
                    <FontAwesomeIcon icon={isHeadTagsEditorOpen ? faChevronUp: faChevronDown} style={{width: 16, height: 16}}/>
                </button>
                {isHeadTagsEditorOpen &&
                    <MonacoEditor
                        language={'html'}
                        name={'customHeadTags'}
                        defaultValue={ initialSettingsData?.headDataSettings?.customHeadTags || ''}
                        value={initialSettingsData?.headDataSettings?.customHeadTags}
                        className={'initialSettings-editor'}
                        //@ts-ignore
                        onChange={(e: string) => onChangeHandler(e, 'headDataSettings')}
                        height={'80vh'}
                    />
                }

            </div>
            <div className={'field'}>
                <p> 3rd Party Scripts:</p>
                <button className={'btn btn-dark'} onClick={()=>setIs3rdPartyScriptEditorOpen(!is3rdPartyScriptEditorOpen)}>
                    3rd Party Scripts
                    <FontAwesomeIcon icon={is3rdPartyScriptEditorOpen ? faChevronUp: faChevronDown} style={{width: 16, height: 16}}/>
                </button>
                {is3rdPartyScriptEditorOpen &&
                    <MonacoEditor
                        language={'text'}
                        name={'customScripts'}
                        defaultValue={ initialSettingsData?.headDataSettings?.customScripts || ''}
                        value={initialSettingsData?.headDataSettings?.customScripts}
                        className={'initialSettings-editor'}
                        //@ts-ignore
                        onChange={(e: string) => onChangeHandler(e, 'headDataSettings')}
                        height={'80vh'}
                    />
                }


            </div>
            <div className={'field'}>

                <p>PWA:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'pwa192'}
                       placeholder={'192px x 192px'}
                       value={initialSettingsData?.headDataSettings?.pwa192}
                       className={'primaryInput'}/>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'pwa384'}
                       placeholder={'384px x 384px'}
                       value={initialSettingsData?.headDataSettings?.pwa384}
                       className={'primaryInput'}/>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       name={'pwa512'}
                       value={initialSettingsData?.headDataSettings?.pwa512}
                       placeholder={'512px x 512px'}
                       className={'primaryInput'}/>

            </div>




            <div className={'checkboxField'}>
                <p>RTA:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       type={'checkbox'}
                       name={'rtaContent'}
                       checked={initialSettingsData?.headDataSettings?.rtaContent}
                       className={'primaryInput'}/>
            </div>

        </Style>
    )
};
export default HeadDataSettings;