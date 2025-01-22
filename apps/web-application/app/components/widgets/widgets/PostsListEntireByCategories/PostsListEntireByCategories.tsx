import React, { FC } from 'react';
import './PostsListEntireByCategories.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { capitalizeFirstLetters } from '@repo/utils';

interface IProps {
    locale: string;
    count: number;
    uniqueData: {
        categoriesData: ICategory[];
        categoriesCount: number;
    };
    dictionary: {
        [key: string]: string;
    };
}

interface ICategory {
    _id: string;
    name: string;
    description: string;
    posts: {
        title: string;
        icon?: string;
        redirectLink: string;
        _id: string;
    }[];
    postsCount: number;
}

const PostsListEntireByCategories: FC<IProps> = ({
    uniqueData,
    locale,
    dictionary,
    // count
}) => {
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    return (
        <div className={'postsListByCategories'}>
            <div className={'postsListByCategoriesContainer'}>
                {uniqueData?.categoriesData?.map(category => {
                    return (
                        <div key={category?._id} className={'postsListByCategoriesGroup'}>
                            <Link className={'categoryGroupTitleLink'} href={`/category/${category?._id}`}>
                                <h3 className={'categoryGroupTitle'}>{capitalizeFirstLetters(category.name)}</h3>
                                {category?.postsCount > category.posts.length && (
                                    <span>{dictionary?.['See All'] || 'See All'}</span>
                                )}
                            </Link>

                            {!!category.description && (
                                <p className={'categoryGroupDescription'}>{category.description}</p>
                            )}
                            <div className={'postsListByCategoriesWrapper custom-scroll'}>
                                <ol className={'postsList'}>
                                    {category.posts.map(post => {
                                        const postUrl =
                                            locale === defaultLocale
                                                ? `/post/promotion/${post._id}`
                                                : `/${locale}${`/post/promotion/${post._id}`}`;

                                        return (
                                            <li className={'postsListItem'} key={post._id}>
                                                <Link
                                                    href={post.redirectLink || postUrl}
                                                    className={'postsListItemExternalLink'}
                                                >
                                                    <h4 className="ellipsisText"> {post.title}</h4>
                                                </Link>
                                                <Link href={postUrl} className={'postsListItemInternalLink'}>
                                                    <FontAwesomeIcon
                                                        className={'searchbar-submit-btn-icon'}
                                                        icon={faMagnifyingGlass}
                                                        style={{ width: 15, height: 15 }}
                                                    />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        </div>
                    );
                })}
            </div>
            {uniqueData.categoriesCount > uniqueData.categoriesData.length && (
                <div className={'seeAllCategoriesLink'}>
                    <Link className={'btn btn-primary'} href={`/categories`}>
                        <span>{dictionary?.['All Categories'] || 'All Categories'}</span>
                    </Link>
                </div>
            )}
        </div>
    );
};
export default PostsListEntireByCategories;
