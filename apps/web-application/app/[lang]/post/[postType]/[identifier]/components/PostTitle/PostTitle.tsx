import './PostTitle.styles.scss'
import {FC} from "react";

interface IProps {
    title: string | undefined
}

const PostTitle: FC<IProps> = ({title}) => {
    return <h1 className='post-title'>
             {title}
           </h1>
};

export default PostTitle;