import React, {FC} from "react";
import styled from "styled-components";
import { InitialSettings} from "typescript-types";

const Style = styled.div``;

interface PropTypes {
    language:string,
    onChangeHandler:Function,
    onChangeHandlerWithTranslation:Function,
    initialSettingsData:InitialSettings
}

const HeadDataSettings: FC<PropTypes> = ({onChangeHandler,onChangeHandlerWithTranslation,initialSettingsData,language}) => {

    return (
        <Style className={'setting-section'}>
            <h2>Head Data Settings:</h2>
            <p>Fav Icon Url:</p>
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'favIconUrl'}
                   value={initialSettingsData?.headDataSettings?.favIconUrl}
                   className={'form-control-input'}/>

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
            <input onChange={e => onChangeHandler(e, 'headDataSettings')}
                   name={'customHeadTags'}
                   value={initialSettingsData?.headDataSettings?.customHeadTags}
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