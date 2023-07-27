import React from 'react';
import Link from "next/link";

type CardTitleProps = {
    title: string;
    postUrl: string;
};

const CardTitle: React.FC<CardTitleProps> = ({title, postUrl}) => {

    if (!title) {
        return null;
    }

    return (
        <h1>
            <Link className={`no-underline hover:underline text-black`} href={postUrl}>
                {title}
            </Link>
        </h1>
    );
};

export default CardTitle;