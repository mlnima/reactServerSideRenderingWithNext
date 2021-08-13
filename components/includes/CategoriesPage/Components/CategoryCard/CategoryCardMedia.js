import React from 'react';

const CategoryCardMedia = props => {
    return (
        <React.Fragment>
            <style jsx>{`
              .category-card-image {
                width: 100%;
                height: calc(48vw / 1.777);
              }

              @media only screen and (min-width: 768px) {
                .category-card-image {
                  width: 100%;
                  height: calc(${props.cardWidth}px / 1.777);
                }
              }

            `}</style>
            <img className='category-card-image' src={props.imageUrl}/>
        </React.Fragment>
    );
};
export default CategoryCardMedia;
