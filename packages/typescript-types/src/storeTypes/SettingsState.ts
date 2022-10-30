import {DesignSettings} from "@_typeScriptTypes/settings/DesignSettings";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";
import {MembershipSettings} from "@_typeScriptTypes/settings/MembershipSettings";

export interface SettingsState {
    membershipSettings: MembershipSettings;
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    isSettingSet:boolean,
    eCommerce: {},
}