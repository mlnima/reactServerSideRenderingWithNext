import React, {FC} from 'react';
import {UniqueDataTypes, WidgetSettingsPropTypes} from "typescript-types";

interface SearchTypeInputFieldsPropTypes {
    uniqueData: UniqueDataTypes,
    widgetSettings: WidgetSettingsPropTypes,
    onUniqueDataChangeHandler: any,
    onUniqueDataChangeHandlerWithTranslate: any,
}

const SearchTypeInputFields: FC<SearchTypeInputFieldsPropTypes> =
    ({
         uniqueData,
         widgetSettings,
         onUniqueDataChangeHandlerWithTranslate,
         onUniqueDataChangeHandler
     }) => {

        return (
            <>
                <div className='textInputFieldForWidget widgetSection'>
                    <p>Search TextArea Place Holder</p>
                    <input className='searchInputPlaceHolder form-control-input' name='searchInputPlaceHolder'
                           placeholder='Search TextArea PlaceHolder'
                           value={
                               widgetSettings.activeEditingLanguage === 'default' ?
                                   uniqueData?.searchInputPlaceHolder :
                                   uniqueData?.translations ?
                                       uniqueData?.translations?.[widgetSettings.activeEditingLanguage] ?
                                           uniqueData?.translations?.[widgetSettings.activeEditingLanguage]?.searchInputPlaceHolder || '' :
                                           '' : ''
                           }
                           onChange={e => onUniqueDataChangeHandlerWithTranslate(e)}/>
                </div>
                <div className='textInputFieldForWidget widgetSection'>
                    <p>Switch To Button On Mobile:</p>
                    <input type='checkbox' name='switchToButtonOnMobile' checked={uniqueData?.switchToButtonOnMobile}
                           onChange={e => onUniqueDataChangeHandler(e)}/>
                </div>
            </>
        );
    };
export default SearchTypeInputFields;
