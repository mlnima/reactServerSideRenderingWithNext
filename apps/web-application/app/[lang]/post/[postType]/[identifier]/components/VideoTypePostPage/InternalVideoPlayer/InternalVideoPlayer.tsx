'use client';

import { useEffect, useRef } from 'react';
// @ts-expect-error: it's fine
import videojs, { type Player, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import './InternalVideoPlayer.scss';
import useHLS from './hooks/useHLS';
import useDRM from './hooks/useDRM';
import useAds from './hooks/useAds';
import useAnalytics from './hooks/useAnalytics';

export type IVideoPlayerProps = {
  src: string | undefined | { src: string; type: string };
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  drm?: { type: 'widevine' | 'fairplay'; licenseUrl: string };
  ads?: { tag: string };
  on?: Partial<Record<keyof Player['on'], (...args: any[]) => void>>;
} & Omit<VideoJsPlayerOptions, 'sources'>;

const VideoPlayer = ({ src, poster, autoplay, muted, loop, drm, ads, on, ...rest }: IVideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  // useHLS(playerRef, typeof src === 'string' ? { src, type: 'application/x-mpegURL' } : src);
  useDRM(playerRef, drm);
  useAds(playerRef, ads);
  useAnalytics(playerRef);

  useEffect(() => {
    if (!containerRef.current) return;
    const videoEl = document.createElement('video-js');
    videoEl.className = 'vjs-default-skin';
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(videoEl);

    playerRef.current = videojs(
      videoEl,
      {
        controls: true,
        autoplay,
        muted,
        loop,
        poster,
        preload: 'none',
        responsive: true,
        aspectRatio: '16:9',
        fluid: true,
        disablePictureInPicture: true,
        sources: [typeof src === 'string' ? { src, type: 'video/mp4' } : src],
        // html5: { vhs: { overrideNative: true }, nativeCaptions: false },
        ...rest,
      },
      () => {
        Object.entries(on ?? {}).forEach(([evt, fn]) => playerRef.current?.on(evt, fn));
      },
    );

    return () => playerRef.current?.dispose();
  }, [src, poster, autoplay, muted, loop, on, rest]);

  return <div className={'customVideoPlayer'} data-vjs-player={'true'} ref={containerRef} />;
};

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;

// 'use client';
// import { useEffect, useRef, forwardRef } from 'react';
// import videojs, { type Player, VideoJsPlayerOptions } from 'video.js';
// import 'video.js/dist/video-js.css';
// import './InternalVideoPlayer.scss';
// import useHLS from './hooks/useHLS';
// import useDRM from './hooks/useDRM';
// import useAds from './hooks/useAds';
// import useAnalytics from './hooks/useAnalytics';
//
// export type IVideoPlayerProps = {
//   src: string | { src: string; type: string };
//   poster?: string;
//   autoplay?: boolean;
//   muted?: boolean;
//   loop?: boolean;
//   drm?: { type: 'widevine' | 'fairplay'; licenseUrl: string };
//   ads?: { tag: string };
//   on?: Partial<Record<keyof Player['on'], (...args: any[]) => void>>;
// } & Omit<VideoJsPlayerOptions, 'sources'>;
//
// const VideoPlayer = forwardRef<HTMLVideoElement, IVideoPlayerProps>(
//   ({ src, poster, autoplay, muted, loop, drm, ads, on, ...rest }, ref) => {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const playerRef = useRef<Player | null>(null);
//
//     useHLS(playerRef, typeof src === 'string' ? { src, type: 'application/x-mpegURL' } : src);
//     useDRM(playerRef, drm);
//     useAds(playerRef, ads);
//     useAnalytics(playerRef);
//
//     useEffect(() => {
//       if (!containerRef.current) return;
//       const videoEl = document.createElement('video-js');
//       videoEl.className = 'vjs-default-skin';
//       containerRef.current.innerHTML = '';
//       containerRef.current.appendChild(videoEl);
//
//       playerRef.current = videojs(
//         videoEl,
//         {
//           controls: true,
//           autoplay,
//           muted,
//           loop,
//           poster,
//           preload: 'false',
//           responsive: true,
//           fluid: true,
//           //disablePictureInPicture: true,
//           sources: [typeof src === 'string' ? { src, type: 'video/mp4' } : src],
//           html5: { vhs: { overrideNative: true }, nativeCaptions: false },
//           ...rest,
//         },
//         () => {
//           Object.entries(on ?? {}).forEach(([evt, fn]) => playerRef.current?.on(evt, fn));
//         },
//       );
//
//       return () => playerRef.current?.dispose();
//     }, [src, poster, autoplay, muted, loop, on, rest]);
//
//     return <div className={'customVideoPlayer'} data-vjs-player={'true'} ref={containerRef} />;
//   },
// );
//
// VideoPlayer.displayName = 'VideoPlayer';
// export default VideoPlayer;
