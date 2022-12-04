import React, {useState} from "react";
import styled from "styled-components";
import {useAdminDispatch, useAdminSelector} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {onChangeInputValueCorrector} from "@_variables/variables";
import {
    adminEditMembershipSettings,
    adminPanelUpdateSetting
} from "@store_toolkit/adminReducers/adminPanelSettingsReducer";
import {postTypes} from "data-structures";
import {convertVariableNameToName} from "custom-util";

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

`

const page = () => {
    const dispatch = useAdminDispatch()

    const membershipSettings = useAdminSelector(({adminPanelSettings}: Store) => adminPanelSettings?.membershipSettings)

    const [editingSettings, setEditingSettings] = useState({
        activeEditingLanguage: 'default'
    })

    const onChangeHandler = (e) => {
        const value = onChangeInputValueCorrector(e)
        dispatch(adminEditMembershipSettings({[e.target.name]: value}))
    }

    const onSubmitHandler = () => {
        dispatch(adminPanelUpdateSetting({type: 'membershipSettings', data: membershipSettings}))
    }

    const onAllowedPostTypeUserCanCreateChangeHandler = (e) => {
        const isChecked = onChangeInputValueCorrector(e)
        if (isChecked) {
            dispatch(adminEditMembershipSettings({
                allowedPostTypeUserCanCreate: [...(membershipSettings?.allowedPostTypeUserCanCreate || []), e.target.name]
            }))

        } else {
            dispatch(adminEditMembershipSettings({
                allowedPostTypeUserCanCreate: membershipSettings?.allowedPostTypeUserCanCreate?.filter(postType => postType !== e.target.name)
            }))
        }
    }


    return (
        <Style>
            <h1>Membership Settings</h1>
            <div className="settingSection membership">
                <h3>Membership Feature:</h3>
                <input type="checkbox"
                       checked={membershipSettings?.membership}
                       name={'membership'}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className="settingSection allowUserToPost">
                <h3>Allow User To Post:</h3>
                <input type="checkbox"
                       checked={membershipSettings?.allowUserToPost}
                       name={'allowUserToPost'}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            {membershipSettings?.allowUserToPost &&
            <div className="settingSection allowedPostTypeUserCanCreate">
                <h3>Allowed Post Types User Can Create </h3>
                {postTypes.map(postType => {
                    return (
                        <div key={postType} className={'item'}>
                            {convertVariableNameToName(postType)}
                            <input
                                type={'checkbox'}
                                onChange={e => onAllowedPostTypeUserCanCreateChangeHandler(e)}
                                checked={membershipSettings?.allowedPostTypeUserCanCreate?.includes(postType)}
                                name={postType}/>
                        </div>
                    )
                })}
            </div>
            }



            <button className={'btn btn-primary'} onClick={onSubmitHandler}>
                Save
            </button>

        </Style>
    )
};
export default page;
