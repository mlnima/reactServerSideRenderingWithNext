import {FC} from "react";
import {IdentitySettings} from "@repo/typescript-types";
import {convertVariableNameToName} from "@repo/utils";
import styled from "styled-components";
const Style = styled.div`
  textarea{
    height: 100px;
  }
`

interface PropTypes {
    onChangeHandlerWithTranslate:Function,
    identity:IdentitySettings,
    activeEditingLanguage:string
}

const TitleDescriptionSettingFields: FC<PropTypes> = (
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
            <Style key={page} className={'site-settings-form-section'}>
                    <p>{convertVariableNameToName(title)}:</p>
                    <input className={'primaryInput'} type='text' name={title} value={
                        //@ts-ignore
                        activeEditingLanguage === 'default' ? identity?.[title] :
                            //@ts-ignore
                            identity.translations?.[activeEditingLanguage]?.[title] || ""
                    } onChange={e => onChangeHandlerWithTranslate(e)}/>
                    <p>{convertVariableNameToName(description)}:</p>
                    <textarea className={'primaryInput'} name={description} value={
                        //@ts-ignore
                           activeEditingLanguage === 'default' ? identity?.[description] :
                               //@ts-ignore
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
