import { FC } from 'react';
import './ActorDetails.scss';

interface IProps {
    additionalInfo: {
        [key: string]: string;
    }[];
}

const ActorDetails: FC<IProps> = ({ additionalInfo }) => {
    const renderDetails = additionalInfo
        .filter(detail => !detail?.name?.includes('Views'))

        .map((detail) => {
            const convertNumberDate = (numberDate: string) => {
                if (numberDate?.length === 8) {
                    return `${numberDate.slice(0, 4)}/${numberDate.slice(4, 6)}/${numberDate.slice(6, 8)}`;
                }
                return numberDate;
            };

            const value = detail?.name === 'Born' ? convertNumberDate(detail?.value) : detail?.value;

            return (
                <div className={'actor-detail'} key={detail?.name.trim().toLowerCase()}>
                    <span className={'actor-detail-name'}>{detail?.name.trim() + ':'}</span>
                    {!!value && value?.includes('http') ? (
                        <a href={value} className={'actor-detail-value'} target={'_blank'} title={detail?.name}>
                            External Link
                        </a>
                    ) : (
                        <span className={'actor-detail-value'}>{value}</span>
                    )}
                </div>
            );
        });

    return <div className={'actorDataDetails'}>{renderDetails}</div>;
};
export default ActorDetails;
