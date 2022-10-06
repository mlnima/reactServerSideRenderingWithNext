import {FC} from "react";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";
import convertVariableNameToName from "@_variables/util/convertVariableNameToName";

interface ComponentPropTypes {
    onChangeHandlerWithTranslate:Function,
    identity:IdentitySettings,
    activeEditingLanguage:string
}

const TitleDescriptionSettingFields: FC<ComponentPropTypes> = (
    {
        identity,
        onChangeHandlerWithTranslate,
        activeEditingLanguage
    }) => {
    const pages = [
        'categoriesPage',
        'categoryPage',
        'tags',
        'tag',
        'actor',
        'actors',
        'search'
    ]

    const renderFields = pages.map((page)=>{
        const title = `${page}Title`
        const description = `${page}Description`


        return(
            <div className={'site-settings-form-section'}>
                    <p>{convertVariableNameToName(title)}:</p>
                    <input className={'form-control-input'} type='text' name='categoriesPageTitle' value={
                        activeEditingLanguage === 'default' ? identity?.categoriesPageTitle :
                            identity.translations?.[activeEditingLanguage]?.categoriesPageTitle || ""
                    } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    <p>{convertVariableNameToName(description)}:</p>
                    <textarea className={'form-control-input'} name='categoriesPageDescription' value={
                        activeEditingLanguage === 'default' ? identity?.categoriesPageDescription :
                            identity.translations?.[activeEditingLanguage]?.categoriesPageDescription || ""
                    } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    <p>Category + CategoryPage Title:</p>
            </div>
        )

    })


    return (
        <>
            {renderFields}
        </>
    )
};
export default TitleDescriptionSettingFields;
