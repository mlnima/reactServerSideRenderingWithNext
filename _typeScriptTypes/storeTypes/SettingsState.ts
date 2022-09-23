import {DesignSettings} from "@_typeScriptTypes/settings/DesignSettings";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";

export interface SettingsState {
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    isSettingSet:boolean,
    eCommerce: {},
}