import { RefObject, useEffect } from 'react';
import 'videojs-contrib-ads';
import 'videojs-ima';

export default function useAds(playerRef: RefObject<any | undefined>, ads?: { tag: string }) {
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !ads) return;
    player.ima({ adTagUrl: ads.tag });
  }, [ads]);
}
