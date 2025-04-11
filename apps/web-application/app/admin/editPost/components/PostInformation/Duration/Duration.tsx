'use client';
import React from 'react';

interface DurationPropTypes {
  onChangeHandler: any;
  rendering: boolean;
  duration?: string;
}

const Duration: React.FC<DurationPropTypes> = ({ onChangeHandler, duration }) => {

  return (
    <div className="post-information-section">
      <div className="title">
        <p>Duration</p>
      </div>
      <div className="editor">
        <input
          className={'primaryInput'}
          type="text"
          name="duration"
          value={duration || ''}
          onChange={(e) => onChangeHandler(e)}
        />
      </div>
    </div>
  );
};

export default Duration;