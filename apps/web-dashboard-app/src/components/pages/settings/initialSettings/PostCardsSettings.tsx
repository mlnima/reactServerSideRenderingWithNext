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
 const [isCardBackgroundsEditorOpen,setIsCardBackgroundsEditorOpen] = useState(false)
    return (
        <Style className={'setting-section'}>
            <h2>Post Cards Settings:</h2>
            <p>Cards Width in Desktop:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'cardsWidthDesktop'}
                   value={initialSettingsData?.postCardsSettings?.cardsWidthDesktop}
                   className={'primaryInput'}
                   type="number"/>
            <p>Number of cards per page:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'numberOfCardsPerPage'}
                   value={initialSettingsData?.postCardsSettings?.numberOfCardsPerPage}
                   className={'primaryInput'}
                   type="number"/>
            <p>Number of cards per row In Mobile:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'numberOfCardsPerRowInMobile'}
                   value={initialSettingsData?.postCardsSettings?.numberOfCardsPerRowInMobile}
                   className={'primaryInput'}
                   type="number"/>
            <p>Fallback Image Url On Error:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'fallbackImageUrlOnError'}
                   value={initialSettingsData?.postCardsSettings?.fallbackImageUrlOnError}
                   className={'primaryInput'}
                   type="number"/>
            {/*<p>Custom Card Backgrounds:</p>*/}
            {/*<button className={'btn btn-primary'} onClick={()=>setIsCardBackgroundsEditorOpen(!isCardBackgroundsEditorOpen)}>*/}
            {/*    Backgrounds Editor*/}
            {/*</button>*/}
            {/*{isCardBackgroundsEditorOpen &&*/}
            {/*    <MonacoEditor*/}
            {/*        language={'json'}*/}
            {/*        name={'customCardBackgrounds'}*/}
            {/*        defaultValue={ JSON.stringify(initialSettingsData?.postCardsSettings?.customCardBackgrounds, null, '\t' )}*/}
            {/*        value={JSON.stringify(initialSettingsData?.postCardsSettings?.customCardBackgrounds, null, '\t')}*/}
            {/*        className={'initialSettings-editor'}*/}
            {/*        //@ts-ignore*/}
            {/*        onChange={(e: string) => onJsonChangeHandler(e, 'postCardsSettings')}*/}
            {/*        height={'80vh'}*/}
            {/*    />*/}
            {/*}*/}
        </Style>
    )
};
export default PostCardsSettings;