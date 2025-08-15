import { useState, useRef } from 'react';
import type { PlayerState, Subtitle } from '../types';

interface ControlsViewProps {
  state: PlayerState;
  showControls: boolean;
  availableQualities: string[];
  subtitles: Subtitle[];
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
  onQualityChange: (quality: string) => void;
  onSubtitleChange: (language: string | null) => void;
}

export const ControlsView = ({
  state,
  showControls,
  availableQualities,
  subtitles,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onFullscreenToggle,
  onQualityChange,
  onSubtitleChange,
}: ControlsViewProps) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || state.duration === 0) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * state.duration);
  };

  const progressPercent = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className={`controls ${showControls ? 'visible' : 'hidden'}`}>
      <div className="controls-overlay" />

      {/* Progress Bar */}
      <div className="progress-container">
        <div
          ref={progressRef}
          className="progress-bar"
          onClick={handleProgressClick}
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={state.duration}
          aria-valuenow={state.currentTime}
          tabIndex={0}
        >
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            <div className="progress-thumb" style={{ left: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="controls-bar">
        <div className="controls-left">
          <button className="control-button play-pause" onClick={onPlayPause} aria-label={state.isPlaying ? 'Pause' : 'Play'}>
            {state.isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          <div className="time-display">
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </div>
        </div>

        <div className="controls-center">
          {state.buffering && (
            <div className="buffering-indicator" aria-label="Buffering">
              <div className="spinner-small" />
            </div>
          )}
        </div>

        <div className="controls-right">
          {/* Volume Control */}
          <div className="volume-control" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
            <button className="control-button" onClick={onMuteToggle} aria-label={state.muted ? 'Unmute' : 'Mute'}>
              {state.muted || state.volume === 0 ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : state.volume > 0.5 ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                </svg>
              )}
            </button>

            {showVolumeSlider && (
              <div className="volume-slider">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={state.muted ? 0 : state.volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  aria-label="Volume"
                />
              </div>
            )}
          </div>

          {/* Settings Menu */}
          <div className="settings-menu">
            <button className="control-button" onClick={() => setShowSettingsMenu(!showSettingsMenu)} aria-label="Settings">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
              </svg>
            </button>

            {showSettingsMenu && (
              <div className="settings-dropdown">
                {availableQualities.length > 1 && (
                  <div className="settings-section">
                    <div className="settings-label">Quality</div>
                    {availableQualities.map((quality) => (
                      <button
                        key={quality}
                        className={`settings-option ${state.quality === quality ? 'active' : ''}`}
                        onClick={() => {
                          onQualityChange(quality);
                          setShowSettingsMenu(false);
                        }}
                      >
                        {quality === 'auto' ? 'Auto' : `${quality}p`}
                      </button>
                    ))}
                  </div>
                )}

                {subtitles.length > 0 && (
                  <div className="settings-section">
                    <div className="settings-label">Subtitles</div>
                    <button
                      className={`settings-option ${!state.subtitle ? 'active' : ''}`}
                      onClick={() => {
                        onSubtitleChange(null);
                        setShowSettingsMenu(false);
                      }}
                    >
                      Off
                    </button>
                    {subtitles.map((subtitle) => (
                      <button
                        key={subtitle.language}
                        className={`settings-option ${state.subtitle === subtitle.language ? 'active' : ''}`}
                        onClick={() => {
                          onSubtitleChange(subtitle.language);
                          setShowSettingsMenu(false);
                        }}
                      >
                        {subtitle.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fullscreen Button */}
          <button
            className="control-button"
            onClick={onFullscreenToggle}
            aria-label={state.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {state.fullscreen ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
