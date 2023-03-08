import React, {FC, useState} from "react";
import styled from "styled-components";
import { InitialSettings} from "typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";

const Style = styled.div``;

interface PropTypes {
    language:string,
    onChangeHandler:Function,
    onChangeHandlerWithTranslation:Function,
    initialSettingsData:InitialSettings
}

const HeadDataSettings: FC<PropTypes> = ({onChangeHandler,onChangeHandlerWithTranslation,initialSettingsData,language}) => {
    const [isHeadTagsEditorOpen,setIsHeadTagsEditorOpen] = useState(false)
    return (
        <Style className={'setting-section'}>
            <h2>Head Data Settings:</h2>


            <p>Google Analytics Id:</p>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'googleAnalyticsId'}
                   value={initialSettingsData?.headDataSettings?.googleAnalyticsId}
                   className={'form-control-input'}/>

            <p>Keywords:</p>
            <input onChange={e => onChangeHandlerWithTranslation(e, 'headDataSettings')}
                   name={'keywords'}
                   value={language === 'default' ? initialSettingsData?.headDataSettings?.keywords :
                       initialSettingsData?.headDataSettings?.translations?.[language]?.keywords || ''}
                   className={'form-control-input'}/>

            <p>Title:</p>
            <input onChange={e => onChangeHandlerWithTranslation(e, 'headDataSettings')}
                   name={'title'}
                   value={language === 'default' ? initialSettingsData?.headDataSettings?.title :
                       initialSettingsData?.headDataSettings?.translations?.[language]?.title || ''}
                   className={'form-control-input'}/>

            <p>Description:</p>
            <textarea onChange={e => onChangeHandlerWithTranslation(e, 'headDataSettings')}
                   name={'description'}
                   value={language === 'default' ? initialSettingsData?.headDataSettings?.description :
                       initialSettingsData?.headDataSettings?.translations?.[language]?.description || ''}
                   className={'form-control-input'}/>

            <p>Site Name:</p>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'siteName'}
                   value={initialSettingsData?.headDataSettings?.siteName}
                   className={'form-control-input'}/>

            <p>Theme Color:</p>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'themeColor'}
                   value={initialSettingsData?.headDataSettings?.themeColor}
                   className={'form-control-input'}/>


            <p>Custom Head Tags:</p>
            <button className={'btn btn-primary'} onClick={()=>setIsHeadTagsEditorOpen(!isHeadTagsEditorOpen)}>
                Head Tags Editor
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
            <p>Fav Icon Url:</p>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'favIconUrl'}
                   value={initialSettingsData?.headDataSettings?.favIconUrl}
                   className={'form-control-input'}/>
            <p>PWA:</p>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'pwa192'}
                   placeholder={'192px x 192px'}
                   value={initialSettingsData?.headDataSettings?.pwa192}
                   className={'form-control-input'}/>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'pwa384'}
                   placeholder={'384px x 384px'}
                   value={initialSettingsData?.headDataSettings?.pwa384}
                   className={'form-control-input'}/>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'pwa512'}
                   value={initialSettingsData?.headDataSettings?.pwa512}
                   placeholder={'512px x 512px'}
                   className={'form-control-input'}/>
            <div className={'checkbox-field'}>
                <p>RTA:</p>
                <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                       type={'checkbox'}
                       name={'rtaContent'}
                       checked={initialSettingsData?.headDataSettings?.rtaContent}
                       className={'form-control-input'}/>
            </div>

        </Style>
    )
};
export default HeadDataSettings;