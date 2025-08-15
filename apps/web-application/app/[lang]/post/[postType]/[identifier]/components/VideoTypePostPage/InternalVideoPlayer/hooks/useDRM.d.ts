import { RefObject } from 'react';
export type DRMConfig = {
    type: 'widevine' | 'fairplay';
    licenseUrl: string;
};
export default function useDRM(ref: RefObject<HTMLVideoElement>, drm?: DRMConfig): void;
//# sourceMappingURL=useDRM.d.ts.map