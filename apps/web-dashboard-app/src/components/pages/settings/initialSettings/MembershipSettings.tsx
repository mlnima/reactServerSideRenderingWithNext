import React, { FC } from 'react';
import styled from 'styled-components';
import { IInitialSettings } from "@repo/typescript-types";
import postTypes from '@repo/data-structures';
import PostByUserSettings from "@components/pages/settings/initialSettings/PostByUserSettings";

const Style = styled.div``;

interface PropTypes {
    onChangeHandler: Function;
    initialSettingsData: IInitialSettings;
}

const MembershipSettings: FC<PropTypes> = ({ onChangeHandler, initialSettingsData }) => {
    return (
        <Style className={'setting-section'}>
            <div className={'field'}>
                <h2>Membership Settings:</h2>
            </div>


            <div className={'checkboxField'}>
                <p>Membership:</p>
                <input
                    onChange={e => onChangeHandler(e, 'membershipSettings')}
                    type={'checkbox'}
                    name={'membership'}
                    checked={initialSettingsData?.membershipSettings?.membership}
                    className={'primaryInput'}
                />
            </div>

            {!!initialSettingsData?.membershipSettings?.membership && (
                <>
                    <div className={'checkboxField'}>
                        <p>Anyone Can Register:</p>
                        <input
                            onChange={e => onChangeHandler(e, 'membershipSettings')}
                            type={'checkbox'}
                            name={'anyoneCanRegister'}
                            checked={initialSettingsData?.membershipSettings?.anyoneCanRegister}
                            className={'primaryInput'}
                        />
                    </div>
                    <div className={'checkboxField'}>
                        <p>Users Can Follow EachOther:</p>
                        <input
                            onChange={e => onChangeHandler(e, 'membershipSettings')}
                            type={'checkbox'}
                            name={'usersCanFollowEachOther'}
                            checked={initialSettingsData?.membershipSettings?.usersCanFollowEachOther}
                            className={'primaryInput'}
                        />
                    </div>
                    <div className={'checkboxField'}>
                        <p>Users Can Message EachOther:</p>
                        <input
                            onChange={e => onChangeHandler(e, 'membershipSettings')}
                            type={'checkbox'}
                            name={'usersCanMessageEachOther'}
                            checked={initialSettingsData?.membershipSettings?.usersCanMessageEachOther}
                            className={'primaryInput'}
                        />
                    </div>
                    <div className={'checkboxField'}>
                        <p>Users Can Comment On the Posts:</p>
                        <input
                            onChange={e => onChangeHandler(e, 'membershipSettings')}
                            type={'checkbox'}
                            name={'usersCanCommentOnThePosts'}
                            checked={initialSettingsData?.membershipSettings?.usersCanCommentOnThePosts}
                            className={'primaryInput'}
                        />
                    </div>

                    <div className={'checkboxField'}>
                        <p>Allow User To Post:</p>
                        <input
                            onChange={e => onChangeHandler(e, 'membershipSettings')}
                            type={'checkbox'}
                            name={'allowUserToPost'}
                            checked={initialSettingsData?.membershipSettings?.allowUserToPost}
                            className={'primaryInput'}
                        />
                    </div>

                    {initialSettingsData?.membershipSettings?.allowUserToPost && <PostByUserSettings/>}

                    {/*<div className={'checkboxField'}>*/}
                    {/*    <p>Users Personal Email Address(eg. username@domain.com):</p>*/}
                    {/*    <input onChange={e => onChangeHandler(e, 'membershipSettings')}*/}
                    {/*           type={'checkbox'}*/}
                    {/*           name={'usersCanCommentOnThePosts'}*/}
                    {/*           checked={initialSettingsData?.membershipSettings?.usersPersonalEmailAddress}*/}
                    {/*           className={'primaryInput'}/>*/}
                    {/*</div>*/}
                </>
            )}
        </Style>
    );
};
export default MembershipSettings;
