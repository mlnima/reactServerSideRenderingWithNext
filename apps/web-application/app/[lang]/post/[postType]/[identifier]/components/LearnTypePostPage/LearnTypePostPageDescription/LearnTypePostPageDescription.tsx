import {FC} from "react";
import dynamic from 'next/dynamic'
const ObjectKeyDescriptionRenderer = dynamic(() => import('../ObjectKeyDescriptionRenderer/ObjectKeyDescriptionRenderer'))
import './LearnTypePostPageDescription.styles.scss'

interface IProps {
    description: string | object,
    locale: string,
}

const LearnTypePostPageDescription: FC<IProps> = ({description}) => {

    return (
        <div className={'learn-post-description'}>
            {Array.isArray(description)  ? <ObjectKeyDescriptionRenderer description={description}/> :
                null
            }
        </div>
    );
};


export default LearnTypePostPageDescription;