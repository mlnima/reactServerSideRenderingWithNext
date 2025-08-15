import { RefObject, useEffect } from 'react';

export type DRMConfig = { type: 'widevine' | 'fairplay'; licenseUrl: string };

export default function useDRM(ref: RefObject<HTMLVideoElement | null>, drm?: DRMConfig) {
  useEffect(() => {
    if (!drm || !ref.current) return;
    ref.current.setAttribute(
      'data-setup',
      JSON.stringify({
        html5: {
          vhs: {
            licenseUrl: drm.licenseUrl,
            keySystems: {
              'com.widevine.alpha': drm.licenseUrl,
              'com.apple.fps.1_0': drm.licenseUrl,
            },
          },
        },
      }),
    );
  }, [drm]);
}
