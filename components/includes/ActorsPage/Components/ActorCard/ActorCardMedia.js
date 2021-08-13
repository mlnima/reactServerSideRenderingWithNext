import React from 'react';

const ActorCardMedia = props => {
    return (
        <React.Fragment>
            <style jsx>{`
              .actor-card-image {
                width: 100%;
                height: calc(48vw / 1.777);
              }

              @media only screen and (min-width: 768px) {
                .actor-card-image {
                  width: 100%;
                  height: calc(${props.cardWidth}px / 1.777);
                }
              }

            `}</style>
            <img className='actor-card-image' src={props.imageUrl}/>
        </React.Fragment>
    );
};
export default ActorCardMedia;






