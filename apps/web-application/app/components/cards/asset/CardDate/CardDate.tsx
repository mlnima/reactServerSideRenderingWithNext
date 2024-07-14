import { FC } from 'react';
import { formatDatePostCard } from '@repo/shared-util';
import './CardDate.scss';

interface IProps {
    updatedAt?: string;
    createdAt?: string;
    showDateOnCard?: boolean;
}

const CardDate: FC<IProps> = ({ updatedAt, createdAt, showDateOnCard }) => {
    if (!showDateOnCard) return null;
    return (
        <div className={'cardDate smallText cardStat'} style={{ visibility: showDateOnCard ? 'initial' : 'hidden' }}>
            {!!updatedAt && !!createdAt ? formatDatePostCard(updatedAt || createdAt) : ''}
        </div>
    );
};
export default CardDate;
