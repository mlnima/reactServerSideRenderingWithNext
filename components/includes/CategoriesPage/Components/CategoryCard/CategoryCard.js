import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import CategoryCardMedia from "./CategoryCardMedia";

const CategoryCard = ({cardWidth, category}) => {
    const router = useRouter()

    return (
        <Link href={`/category/${category?._id}`}>
            <a className='category-card-link'>
                <style jsx>{`
                  .category-card-link {
                    width: 48vw;
                    margin: 1vw;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;

                    .category-card-title {
                      width: 100%;
                      color: var(--main-text-color);
                      text-align: center;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 1;
                    }
                  }

                  @media only screen and (min-width: 768px) {
                    .category-card-link {
                      width: ${cardWidth}px;
                      margin: 5px;
                    }

                  }


                `}</style>
                <CategoryCardMedia cardWidth={cardWidth} imageUrl={category?.imageUrl}  mediaAlt={category?.translations?.[router.locale]?.name || category?.name}/>
                <h3 className='category-card-title'>{category?.translations?.[router.locale]?.name || category?.name}</h3>
            </a>
        </Link>
    );
};
export default CategoryCard;
