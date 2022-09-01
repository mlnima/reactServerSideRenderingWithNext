import {DesignSettings} from "@_typeScriptTypes/settings/DesignSettings";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";

export interface SettingsState {
    isMobile: boolean,
    isAppleMobileDevice:boolean,
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    eCommerce: {},
}