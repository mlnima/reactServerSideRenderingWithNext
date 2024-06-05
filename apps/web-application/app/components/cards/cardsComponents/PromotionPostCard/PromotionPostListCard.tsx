import React, {FC} from "react";
import CardTitle from "../../asset/CardTitle/CardTitle";
import Link from "next/link";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './PromotionPostListCard.styles.scss'
import {clientAPIRequestViewPost} from "@repo/api-requests";

interface PropTypes {
    post:{
        title:string,
        icon?:string,
        _id:string,
        redirectLink:string
    }
}

const PromotionPostListCard: FC<PropTypes> = ({post}) => {

    return (
        <li className={'postsListItem'} onClick={()=>{
            if (post?._id) {
                clientAPIRequestViewPost(post?._id)
            }
        }}>
            <div className={'external-link-index'}>
                <CardTitle title={post.title} targetLink={'_blank'} url={post.redirectLink}/>
            </div>

            <Link href={`/post/promotion/${post._id}`} className={'internal-link'} >
                <FontAwesomeIcon className={'searchbar-submit-btn-icon'}
                                 icon={faMagnifyingGlass}
                                 style={{width:15,height:15}}/>
            </Link>
        </li>
    )
};
export default PromotionPostListCard;