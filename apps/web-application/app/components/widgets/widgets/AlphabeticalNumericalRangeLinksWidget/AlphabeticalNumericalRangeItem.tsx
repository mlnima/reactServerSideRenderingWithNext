'use client';
import React, {FC} from "react";
import Link from 'next/link';
import {v4 as uuidv4} from "uuid";
import {usePathname} from "next/navigation";

interface IProps {
    letter:string,
    pathname:string,
    startWith:string,
    isOpen:boolean

}

const AlphabeticalNumericalRangeItem: FC<IProps> = ({letter,pathname,startWith,isOpen}) => {

    return (
        <Link className={`alphabeticalRangeItem ${startWith?.includes(letter) ? 'activeItem' : ''} btn btn-dark`}
              href={{
                  pathname,
                  query: {
                      startWith: letter === '#' ? 'other' : letter,
                  }
              }}
              style={{
                  pointerEvents: 'auto',
                  display: isOpen ? 'flex' : "none"
              }}
              key={uuidv4()}>
            {letter.toUpperCase()}
        </Link>
    )
};
export default AlphabeticalNumericalRangeItem
