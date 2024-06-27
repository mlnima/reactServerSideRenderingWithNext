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
            <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                   name={'cardsWidthDesktop'}
                   value={initialSettingsData?.layoutSettings?.cardsWidthDesktop}
                   className={'primaryInput'}
                   type="number"/>
            <p>Number of cards per page:</p>
            <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                   name={'numberOfCardsPerPage'}
                   value={initialSettingsData?.layoutSettings?.numberOfCardsPerPage}
                   className={'primaryInput'}
                   type="number"/>
            <p>Number of cards per row In Mobile:</p>
            <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                   name={'numberOfCardsPerRowInMobile'}
                   value={initialSettingsData?.layoutSettings?.numberOfCardsPerRowInMobile}
                   className={'primaryInput'}
                   type="number"/>
            <p>Fallback Image Url On Error:</p>
            <input onChange={e => onChangeHandler(e, 'layoutSettings')}
                   name={'fallbackImageUrlOnError'}
                   value={initialSettingsData?.layoutSettings?.fallbackImageUrlOnError}
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
            {/*        defaultValue={ JSON.stringify(initialSettingsData?.layoutSettings?.customCardBackgrounds, null, '\t' )}*/}
            {/*        value={JSON.stringify(initialSettingsData?.layoutSettings?.customCardBackgrounds, null, '\t')}*/}
            {/*        className={'initialSettings-editor'}*/}
            {/*        //@ts-ignore*/}
            {/*        onChange={(e: string) => onJsonChangeHandler(e, 'layoutSettings')}*/}
            {/*        height={'80vh'}*/}
            {/*    />*/}
            {/*}*/}
        </Style>
    )
};
export default PostCardsSettings;