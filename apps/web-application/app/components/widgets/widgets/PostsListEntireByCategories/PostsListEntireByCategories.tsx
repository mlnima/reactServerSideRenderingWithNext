import React, {FC} from "react";
import './PostsListEntireByCategories.styles.scss'
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {capitalizeFirstLetters} from "custom-util";

interface IProps {
    locale: string,
    count: number,
    uniqueData: {
        categoriesDataWithPosts: ICategory[]
    },
    dictionary: {
        [key: string]: string
    }
}

interface ICategory {
    _id: string,
    name: string,
    description: string,
    posts: {
        title: string,
        icon?: string,
        redirectLink: string,
        _id: string
    }[],
}

const PostsListEntireByCategories: FC<IProps> = ({uniqueData, locale, dictionary, count}) => {
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    return (
        <div className={'postsListByCategories'}>
            {uniqueData?.categoriesDataWithPosts?.map((category) => {
                return (
                    <div key={category?._id} className={'postsListByCategoriesGroup'}>

                        <Link className={'categoryGroupTitleLink'} href={`/category/${category?._id}`}>
                            <h2 className={'categoryGroupTitle'}>{capitalizeFirstLetters(category.name)}</h2>
                            <span>{dictionary?.['See All'] || 'See All'}</span>
                        </Link>

                        {!!category.description && <p className={'categoryGroupDescription'}>{category.description}</p>}
                        <div className={'postsListByCategoriesWrapper custom-scroll'}>
                            <ol className={'postsList'}>
                                {category.posts.map((post) => {
                                    const postUrl = locale === defaultLocale ?
                                        `/post/promotion/${post._id}` :
                                        `/${locale}${`/post/promotion/${post._id}`}`;

                                    return (
                                        <li className={'postsListItem'} key={post._id}>
                                            <Link href={post.redirectLink || postUrl}
                                                  className={'postsListItemExternalLink'}>
                                                <h3 className="ellipsisText">  {post.title}</h3>

                                            </Link>
                                            <Link href={postUrl} className={'postsListItemInternalLink'}>
                                                <FontAwesomeIcon className={'searchbar-submit-btn-icon'}
                                                                 icon={faMagnifyingGlass}
                                                                 style={{width: 15, height: 15}}/>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>



                    </div>
                )
            })}
        </div>
    )
};
export default PostsListEntireByCategories;


// {category.posts.map((post) => {
//     return (
//         <PromotionPostListCard post={post} key={post._id}/>
//     )
// })}

// {/*/!*//@ts-ignore*!/*/}
//     {/*{(category?.count > (uniqueData?.count || count)) &&*/}
//     {/*    <div className={'postsListGroupActionButtons'}>*/}
//     {/*        <Link href={`/category/${category?._id}`} className={'btn btn-primary seeAllButton'}>*/}
//     {/*            {dictionary?.['See All'] || 'See All'}*/}
//     {/*        </Link>*/}
//     {/*    </div>*/}
//     {/*}*/}
