import { RefObject, useEffect } from 'react';
import mux from 'mux-embed';

export default function useAnalytics(playerRef: RefObject<any | undefined>) {
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    mux.monitor(player.el(), { debug: false, data: { env_key: 'YOUR_ENV_KEY' } });
  }, []);
}
