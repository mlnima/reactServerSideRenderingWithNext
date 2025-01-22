// @ts-nocheck
import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import styled from 'styled-components';
import {InitialSettings} from "@repo/typescript-types";
import {postTypes} from '@repo/data-structures';
import {inputValueSimplifier} from '@repo/utils';
import {editInitialSettings} from '@store/reducers/settingsReducer';
import {useAppDispatch} from '@store/hooks';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {convertVariableNameToName, capitalizeFirstLetter} from '@repo/utils';

interface StyleProps {
    className?: any;
}

const Style = styled.div`
    .actionButtons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .postSettings {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        .postSetting {
            width: 300px;

            .field {
                h3 {
                    padding: 0.25rem;
                    margin: 0;
                }
            }

            .checkboxField {
                grid-template-columns: 1fr 50px;
            }
        }
    }
`;

interface PropTypes {
    onChangeHandler: Function;
    onSaveHandler: MouseEventHandler<HTMLButtonElement>;
    initialSettingsData: InitialSettings;
}

const ContentSettings: FC<PropTypes> = ({onChangeHandler, initialSettingsData, onSaveHandler}) => {
    const dispatch = useAppDispatch();
    const [openPostSettings, setOpenPostSettings] = useState(false);
    const postConfigTypes = [
        'viewSystem',
        'showViewsOnCard',
        'ratingSystem',
        'showRatingOnCard',
        'showDateOnCard',
        'showDateInPostPage',
        'allowComment',
    ];
    const onPostTypeSettingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, postType: string) => {
        const value = inputValueSimplifier(e);
        //@ts-ignore

        dispatch(
            editInitialSettings({
                contentSettings: {
                    //@ts-ignore
                    ...(initialSettingsData?.contentSettings || {}),
                    postSettings: {
                        ...(initialSettingsData?.contentSettings?.postSettings || {}),
                        [postType]: {
                            ...(initialSettingsData?.contentSettings?.postSettings?.[postType] || {}),
                            [e.target.name]: value,
                        },
                    },
                },
            }),
        );
    };


    useEffect(() => {
        console.log(`initialSettingsData=> `,initialSettingsData)
    }, []);
    return (
        <Style className={'setting-section'}>
            <div className={'field'}>
                <h2>Content Settings:</h2>
            </div>

            <div className="inputField">
                <p>Cards Width in Desktop:</p>
                <input
                    onChange={e => onChangeHandler(e, 'contentSettings')}
                    name={'cardsWidthDesktop'}
                    value={initialSettingsData?.contentSettings?.cardsWidthDesktop}
                    className={'primaryInput'}
                    type="number"
                />
            </div>
            <div className="inputField">
                <p>Content per page:</p>
                <input
                    onChange={e => onChangeHandler(e, 'contentSettings')}
                    name={'contentPerPage'}
                    value={initialSettingsData?.contentSettings?.contentPerPage}
                    className={'primaryInput'}
                    type="number"
                />
            </div>
            <div className="inputField">
                <p>Number of cards per row In Mobile:</p>
                <input
                    onChange={e => onChangeHandler(e, 'contentSettings')}
                    name={'numberOfCardsPerRowInMobile'}
                    value={initialSettingsData?.contentSettings?.numberOfCardsPerRowInMobile}
                    className={'primaryInput'}
                    type="number"
                />
            </div>
            <div className="field actionButtons ">
                <button className="btn btn-dark" onClick={() => setOpenPostSettings(!openPostSettings)}>
                    PostSettings
                    <FontAwesomeIcon
                        icon={openPostSettings ? faChevronUp : faChevronDown}
                        style={{width: 16, height: 16}}
                    />
                </button>
                <button className={'btn btn-primary'} onClick={onSaveHandler}>
                    Save
                </button>
            </div>

            <div className="postSettings">
                {openPostSettings &&
                    postTypes.map((postType, index) => {
                        return (
                            <div key={postType} className={'postSetting'}>
                                <div className={'field'}>
                                    <h3>{capitalizeFirstLetter(postType)}:</h3>
                                </div>

                                {postConfigTypes.map(postTypeSetting => {
                                    return (
                                        <div className={'checkboxField'}>
                                            <p>{convertVariableNameToName(postTypeSetting)}:</p>
                                            <input
                                                onChange={e => onPostTypeSettingChangeHandler(e, postType)}
                                                type={'checkbox'}
                                                name={postTypeSetting}
                                                //@ts-ignore
                                                checked={
                                                    initialSettingsData?.contentSettings?.postSettings?.[postType]?.[
                                                        postTypeSetting
                                                        ]
                                                }
                                                className={'primaryInput'}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        </Style>
    );
};
export default ContentSettings;
//
// {/*<div className={'checkboxField'}>*/}
// {/*    <p>View System:</p>*/}
// {/*    <input*/}
// {/*        onChange={e => onPostTypeSettingChangeHandler(e, postType)}*/}
// {/*        type={'checkbox'}*/}
// {/*        name={'viewSystem'}*/}
// {/*        checked={initialSettingsData?.contentSettings?.postSettings?.[postType]?.viewSystem}*/}
// {/*        className={'primaryInput'}*/}
// {/*    />*/}
// {/*</div>*/}
// {/*<div className={'checkboxField'}>*/}
// {/*    <p>Show View on Card:</p>*/}
// {/*    <input*/}
// {/*        onChange={e => onPostTypeSettingChangeHandler(e, postType)}*/}
// {/*        type={'checkbox'}*/}
// {/*        name={'showViewOnCard'}*/}
// {/*        checked={initialSettingsData?.contentSettings?.postSettings?.[postType]?.showViewOnCard}*/}
// {/*        className={'primaryInput'}*/}
// {/*    />*/}
// {/*</div>*/}
// {/*<div className={'checkboxField'}>*/}
// {/*    <p>Rating System:</p>*/}
// {/*    <input*/}
// {/*        onChange={e => onPostTypeSettingChangeHandler(e, postType)}*/}
// {/*        type={'checkbox'}*/}
// {/*        name={'ratingSystem'}*/}
// {/*        checked={initialSettingsData?.contentSettings?.postSettings?.[postType]?.ratingSystem}*/}
// {/*        className={'primaryInput'}*/}
// {/*    />*/}
// {/*</div>*/}
// {/*<div className={'checkboxField'}>*/}
// {/*    <p>Show Rating on Card:</p>*/}
// {/*    <input*/}
// {/*        onChange={e => onPostTypeSettingChangeHandler(e, postType)}*/}
// {/*        type={'checkbox'}*/}
// {/*        name={'showRatingOnCard'}*/}
// {/*        checked={initialSettingsData?.contentSettings?.postSettings?.[postType]?.showRatingOnCard}*/}
// {/*        className={'primaryInput'}*/}
// {/*    />*/}
// {/*</div>*/}
// {/*<div className={'checkboxField'}>*/}
// {/*    <p>Show Date on Card:</p>*/}
// {/*    <input*/}
// {/*        onChange={e => onPostTypeSettingChangeHandler(e, postType)}*/}
// {/*        type={'checkbox'}*/}
// {/*        name={'showDateOnCard'}*/}
// {/*        checked={initialSettingsData?.contentSettings?.postSettings?.[postType]?.showDateOnCard}*/}
// {/*        className={'primaryInput'}*/}
// {/*    />*/}
// {/*</div>*/}
// {/*<div className={'checkboxField'}>*/}
// {/*    <p>Show Date in Post Page:</p>*/}
// {/*    <input*/}
// {/*        onChange={e => onPostTypeSettingChangeHandler(e, postType)}*/}
// {/*        type={'checkbox'}*/}
// {/*        name={'showDateInPostPage'}*/}
// {/*        checked={initialSettingsData?.contentSettings?.postSettings?.[postType]?.showDateInPostPage}*/}
// {/*        className={'primaryInput'}*/}
// {/*    />*/}
// {/*</div>*/}
//
// {/*<div key={index} className="inputField">*/}
//
// {/*    <input*/}
// {/*        onChange={e => onChangeHandler(e, 'layoutSettings')}*/}
// {/*        name={`${postType}PerRow`}*/}
// {/*        value={initialSettingsData?.contentSettings[`${postType}PerRow`]}*/}
// {/*        className={'primaryInput'}*/}
// {/*        type="number"*/}
// {/*    />*/}
// {/*</div>*/}
