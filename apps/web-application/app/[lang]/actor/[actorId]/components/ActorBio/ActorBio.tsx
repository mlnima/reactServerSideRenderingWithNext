'use client';
import React, { FC, useState } from 'react';
import { capitalizeFirstLetter } from '@repo/utils/dist/src';
import ActorDetails from '../ActorDetails/ActorDetails';
import './ActorBio.styles.scss';
import { IMeta } from '@repo/typescript-types';

interface IProps {
  actorData: IMeta;
}

const ActorBio: FC<IProps> = ({ actorData }) => {
  const [showMore, setShowMore] = useState(false);

  const onShowDetailsHandler = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!actorData) return null;

  return (
    <div className={'actorBio'}>
      <div className={'actorImages'}>
        {actorData?.imageUrl ? <img className={'actorImage'} src={actorData.imageUrl} alt={actorData?.name || 'actor image'} /> : null}
      </div>
      <h1 className={'actorName'}>{capitalizeFirstLetter(actorData?.name)}</h1>
      <div className={`actorDescriptionDetails${showMore ? 'Open' : 'Closed'}`}>
        {
          // @ts-expect-error: types need to be fixed
          (actorData?.additionalInfo || []).length > 0 ? (
            // @ts-expect-error: types need to be fixed
            <ActorDetails additionalInfo={actorData.additionalInfo} />
          ) : null
        }
        {actorData?.description && (
          <section className={'actorDescription'}>
            <h1>About {actorData?.name}</h1>
            {actorData.description}
          </section>
        )}
      </div>
      {
        // @ts-expect-error: types need to be fixed
        (actorData?.additionalInfo || []).length > 0 || actorData?.description ? (
          <button onClick={onShowDetailsHandler} className={'btn btn-info showMoreDetailBtn'} aria-label={'More Info'}>
            {showMore ? '-' : '+'} More Info
          </button>
        ) : null
      }
    </div>
  );
};
export default ActorBio;
