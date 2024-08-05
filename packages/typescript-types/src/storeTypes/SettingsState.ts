import {DesignSettings, IdentitySettings, InitialSettings, MembershipSettings, PageSettings,UgcSettings} from "@repo/typescript-types";

export interface SettingsState {
    membershipSettings: MembershipSettings;
    ip?: string,
    initialSettings: InitialSettings,
    ugcSettings: UgcSettings,
    currentPageSettings: PageSettings,
    design: DesignSettings,
    identity: IdentitySettings,
    isSettingSet:boolean,
    eCommerce: {},
}