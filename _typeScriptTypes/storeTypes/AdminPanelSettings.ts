import {DesignSettings} from "@_typeScriptTypes/settings/DesignSettings";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";

export interface AdminPanelSettings {
    isMobile?: boolean,
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    eCommerce?: {},
}