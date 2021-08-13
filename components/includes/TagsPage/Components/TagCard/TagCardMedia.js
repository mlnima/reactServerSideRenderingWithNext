import React from 'react';

const TagCardMedia = props => {
    return (
        <React.Fragment>
            <style jsx>{`
              .tag-card-image {
                width: 100%;
                height: calc(48vw / 1.777);
              }

              @media only screen and (min-width: 768px) {
                .tag-card-image {
                  width: 100%;
                  height: calc(${props.cardWidth}px / 1.777);
                }
              }

            `}</style>
            <img className='tag-card-image' src={props.imageUrl}/>
        </React.Fragment>
    );
};
export default TagCardMedia;
