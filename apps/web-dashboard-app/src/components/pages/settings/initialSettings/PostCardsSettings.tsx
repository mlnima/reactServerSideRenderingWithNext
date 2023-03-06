import React, {FC} from "react";
import styled from "styled-components";
import { InitialSettings} from "typescript-types";
import MonacoEditor from "@components/common/MonacoEditor";

const Style = styled.div``;

interface PropTypes {
    onChangeHandler:Function,
    initialSettingsData:InitialSettings
}

const PostCardsSettings: FC<PropTypes> = ({onChangeHandler,initialSettingsData}) => {

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
            <p>Number of cards per row:</p>
            <input onChange={e => onChangeHandler(e, 'postCardsSettings')}
                   name={'numberOfCardsPerRow'}
                   value={initialSettingsData?.postCardsSettings?.numberOfCardsPerRow}
                   className={'form-control-input'}
                   type="number"/>
            <p>Custom Style:</p>
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
        </Style>
    )
};
export default PostCardsSettings;