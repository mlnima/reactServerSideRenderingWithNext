import {
  DesignSettings,
  IdentitySettings,
  IInitialSettings,
  IPageSettings,
  MembershipSettings,
  UgcSettings,
} from '@repo/typescript-types';

export interface SettingsState {
    membershipSettings: MembershipSettings;
    ip?: string,
    initialSettings: IInitialSettings,
    ugcSettings: UgcSettings,
    currentPageSettings: IPageSettings,
    design: DesignSettings,
    identity: IdentitySettings,
    isSettingSet:boolean,
    eCommerce: {},
}