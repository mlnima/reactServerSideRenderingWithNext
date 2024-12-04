import { FC } from 'react';
import { formatDatePostCard } from '@repo/shared-util';
import './CardDate.scss';

interface IProps {
    updatedAt?: string;
    createdAt?: string;
    showDateOnCard?: boolean;
}

const CardDate: FC<IProps> = ({ updatedAt, createdAt, showDateOnCard }) => {
    if ((!updatedAt && !createdAt)) return null;
    return (
        <div className={'cardDate smallText cardStat'}>
            {!!updatedAt && !!createdAt ? formatDatePostCard(updatedAt || createdAt) : ''}
        </div>
    );
};
export default CardDate;
0