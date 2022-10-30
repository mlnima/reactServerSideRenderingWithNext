import {FC} from "react";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";
import convertVariableNameToName from "@_variables/util/convertVariableNameToName";
import styled from "styled-components";
const Style = styled.div`
  textarea{
    height: 100px;
  }
`
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
        '',
        'categoriesPage',
        'categoryPage',
        'tagsPage',
        'tagPage',
        'actorPage',
        'actorsPage',
        'searchPage'
    ]

    const renderFields = pages.map((page)=>{
        const title = page ?  `${page}Title` :'title'
        const description = page ? `${page}Description` : 'description'


        return(
            <Style className={'site-settings-form-section'}>
                    <p>{convertVariableNameToName(title)}:</p>
                    <input className={'form-control-input'} type='text' name={title} value={
                        activeEditingLanguage === 'default' ? identity?.[title] :
                            identity.translations?.[activeEditingLanguage]?.[title] || ""
                    } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    <p>{convertVariableNameToName(description)}:</p>
                    <textarea className={'form-control-input'} name={description} value={
                           activeEditingLanguage === 'default' ? identity?.[description] :
                            identity.translations?.[activeEditingLanguage]?.[description] || ""
                    } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    <p>Category + CategoryPage Title:</p>
            </Style>
        )

    })


    return (
        <>
            {renderFields}
        </>
    )
};
export default TitleDescriptionSettingFields;
