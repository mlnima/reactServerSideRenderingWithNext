import './PostDescription.styles.scss';

import {FC} from "react";

interface IProps {
    description: any;
}

const PostDescription: FC<IProps> = ({description}) => {


    return (
        <div className={'postDescription'}>
            {typeof description === 'string' && description }
        </div>
    )
}

export default PostDescription;