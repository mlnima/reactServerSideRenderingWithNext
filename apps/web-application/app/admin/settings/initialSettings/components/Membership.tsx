'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { postTypes } from '@repo/data-structures';
import { convertVariableNameToName } from '@repo/utils';
import { useAppDispatch } from '@storeDashboard/hooks';
import { useAppSelector } from '@storeDashboard/hooks';
import { editMembershipSettingsAction, updateSettingAction } from '@storeDashboard/reducers/settingsReducer';
import { inputValueSimplifier } from '@repo/utils';

const Style = styled.div`
    .settingSection {
        width: 320px;
        margin: 8px;
        box-sizing: border-box;
    }

    .allowedPostTypeUserCanCreate {
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .membership, .allowUserToPost {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const Membership = () => {
  const dispatch = useAppDispatch();
  const membershipSettings = useAppSelector(({ settings }) => settings?.membershipSettings);
  const [editingSettings, setEditingSettings] = useState({
    activeEditingLanguage: 'default',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = inputValueSimplifier(e);
    dispatch(editMembershipSettingsAction({ [e.target.name]: value }));
  };

  const onSubmitHandler = (): void => {
    dispatch(updateSettingAction({ type: 'membershipSettings', data: membershipSettings }));
  };

  const onAllowedPostTypeUserCanCreateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = inputValueSimplifier(e);
    if (isChecked) {
      dispatch(editMembershipSettingsAction({
        allowedPostTypeUserCanCreate: [...(membershipSettings?.allowedPostTypeUserCanCreate || []), e.target.name],
      }));
    } else {
      dispatch(editMembershipSettingsAction({
        allowedPostTypeUserCanCreate: membershipSettings?.allowedPostTypeUserCanCreate?.filter((postType: string) => postType !== e.target.name),
      }));
    }
  };

  return (
    <Style>
      <h1>Membership Settings</h1>
      <div className="settingSection membership">
        <h3>Membership Feature:</h3>
        <input type="checkbox"
               checked={membershipSettings?.membership}
               name={'membership'}
               onChange={e => onChangeHandler(e)} />
      </div>
      <div className="settingSection allowUserToPost">
        <h3>Allow User To Post:</h3>
        <input type="checkbox"
               checked={membershipSettings?.allowUserToPost}
               name={'allowUserToPost'}
               onChange={e => onChangeHandler(e)} />
      </div>
      {membershipSettings?.allowUserToPost &&
        <div className="settingSection allowedPostTypeUserCanCreate">
          <h3>Allowed Post Types User Can Create </h3>
          {postTypes.map((postType: string) => (
            <div key={postType} className={'item'}>
              {convertVariableNameToName(postType)}
              <input
                type={'checkbox'}
                onChange={e => onAllowedPostTypeUserCanCreateChangeHandler(e)}
                checked={membershipSettings?.allowedPostTypeUserCanCreate?.includes(postType)}
                name={postType} />
            </div>
          ))}
        </div>
      }
      <button className={'btn btn-primary'} onClick={onSubmitHandler}>
        Save
      </button>
    </Style>
  );
};

export default Membership;