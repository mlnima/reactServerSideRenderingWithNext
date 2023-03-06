import React, {FC, useState} from "react";
import styled from "styled-components";
import { InitialSettings} from "typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";

const Style = styled.div``;

interface PropTypes {
    onChangeHandler:Function,
    onJsonChangeHandler:Function,
    initialSettingsData:InitialSettings
}

const PostCardsSettings: FC<PropTypes> = ({onChangeHandler,initialSettingsData,onJsonChangeHandler}) => {
 const [isStyleEditorOpen,setIsStyleEditorOpen] = useState(false)
 const [isCardBackgroundsEditorOpen,setIsCardBackgroundsEditorOpen] = useState(false)
    return (
        <Style className={'setting-section'}>
            <h2>Post Cards Settings:</h2>
            <p>Cards Width in Desktop:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'cardsWidthDesktop'}
                   value={initialSettingsData?.postCardsSettings?.cardsWidthDesktop}
                   className={'form-control-input'}
                   type="number"/>
            <p>Number of cards per page:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'numberOfCardsPerPage'}
                   value={initialSettingsData?.postCardsSettings?.numberOfCardsPerPage}
                   className={'form-control-input'}
                   type="number"/>
            <p>Number of cards per row In Mobile:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'numberOfCardsPerRowInMobile'}
                   value={initialSettingsData?.postCardsSettings?.numberOfCardsPerRowInMobile}
                   className={'form-control-input'}
                   type="number"/>
            <p>Fallback Image Url On Error:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'fallbackImageUrlOnError'}
                   value={initialSettingsData?.postCardsSettings?.fallbackImageUrlOnError}
                   className={'form-control-input'}
                   type="number"/>
            <p>Custom Card Backgrounds:</p>
            <button className={'btn btn-primary'} onClick={()=>setIsCardBackgroundsEditorOpen(!isCardBackgroundsEditorOpen)}>
                Backgrounds Editor
            </button>
            {isCardBackgroundsEditorOpen &&
                <MonacoEditor
                    language={'json'}
                    name={'customCardBackgrounds'}
                    defaultValue={ JSON.stringify(initialSettingsData?.postCardsSettings?.customCardBackgrounds, null, '\t' )}
                    value={JSON.stringify(initialSettingsData?.postCardsSettings?.customCardBackgrounds, null, '\t')}
                    className={'initialSettings-editor'}
                    //@ts-ignore
                    onChange={(e: string) => onJsonChangeHandler(e, 'postCardsSettings')}
                    height={'80vh'}
                />
            }

            <p>Custom Style:</p>
            <button className={'btn btn-primary'} onClick={()=>setIsStyleEditorOpen(!isStyleEditorOpen)}>
                Styles Editor
            </button>
            {isStyleEditorOpen &&
                <MonacoEditor
                    language={'scss'}
                    name={'customStyles'}
                    defaultValue={initialSettingsData?.postCardsSettings?.customStyles || ''}
                    value={initialSettingsData?.postCardsSettings?.customStyles}
                    className={'initialSettings-editor'}
                    //@ts-ignore
                    onChange={(e: string) => onChangeHandler(e, 'postCardsSettings')}
                    height={'80vh'}
                />
            }

        </Style>
    )
};
export default PostCardsSettings;