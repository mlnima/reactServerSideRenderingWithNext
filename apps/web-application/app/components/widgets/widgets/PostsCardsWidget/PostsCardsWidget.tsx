import { FC } from 'react';
import { IPost } from "@repo/typescript-types";
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';

interface IProps {
    locale: string;
    uniqueData?: {
        posts: IPost[];
        totalCount: number;
    };
    dictionary: {
        [key: string]: string;
    };
}

const PostsCardsWidget: FC<IProps> = ({ locale, uniqueData, dictionary }) => {
    return (
        <PostsCardsRenderer
            locale={locale}
            posts={uniqueData?.posts}
            dictionary={dictionary}
        />
    );
};

export default PostsCardsWidget;
