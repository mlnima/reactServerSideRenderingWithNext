import { RefObject, useEffect } from 'react';
import Hls from 'hls.js';

export default function useHLS(ref: RefObject<HTMLVideoElement | null>, source: { src: string; type: string }) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (source.type !== 'application/x-mpegURL') return;

    let hls: Hls;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(source.src);
      hls.attachMedia(video);
    } else if (video.canPlayType(source.type)) {
      video.src = source.src;
    }

    return () => hls?.destroy();
  }, [source.src, source.type]);
}
