import { FC } from 'react';
import { Post } from 'typescript-types';
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';

interface IProps {
    isSidebar?: boolean;
    locale: string;
    uniqueData?: {
        posts: Post[];
        totalCount: number;
    };
    dictionary: {
        [key: string]: string;
    };
}

const PostsCardsWidget: FC<IProps> = ({ locale, uniqueData, isSidebar, dictionary }) => {
    return (
        <PostsCardsRenderer
            isSidebar={isSidebar}
            locale={locale}
            posts={uniqueData?.posts}
            dictionary={dictionary}
        />
    );
};

export default PostsCardsWidget;
