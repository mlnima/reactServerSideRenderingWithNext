'use client';

import { ChangeEvent } from 'react';
import { videoQualities } from '@repo/data-structures';
import { FC } from 'react';

interface PropType {
  rendering: boolean;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  postQuality?: string;
}

const Quality: FC<PropType> = ({ rendering, onChangeHandler, postQuality }) => {
  if (!rendering) return null;

  return (
    <div className="post-information-section">
      <div className="title">
        <p>Quality</p>
      </div>
      <div className="editor">
        <div className="option">
          <select className={'primarySelect'} value={postQuality || 'HD'} name="quality" onChange={onChangeHandler}>
            {videoQualities.map((videoQuality: string, index: number) => {
              return (
                <option key={`${videoQuality}${index}`} value={videoQuality}>
                  {videoQuality}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Quality;
