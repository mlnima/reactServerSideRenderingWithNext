import {FC} from "react";
import './ActorDetails.styles.scss';

interface IProps {
    // additionalInfo: {
    //     name: string,
    //     value: string
    // }[]
    additionalInfo: any
}

const ActorDetails:FC<IProps> = ({additionalInfo}) => {

    //@ts-ignore
    const renderDetails = additionalInfo.filter((detail) => !detail?.name?.includes('Views'))
        //@ts-ignore
        .map((detail,index) => {

            //@ts-ignore
            const convertNumberDate = (numberDate) => {
                if (numberDate?.length === 8) {
                    return `${numberDate.slice(0, 4)}/${numberDate.slice(4, 6)}/${numberDate.slice(6, 8)}`
                }
                return numberDate
            }

            const value = detail?.name === 'Born' ? convertNumberDate(detail?.value) :
                detail?.value


            return (
                <div className={'actor-detail'} key={index}>
                    <span className={'actor-detail-name'}>
                        {detail?.name.trim() + ':'}
                    </span>
                    {!!value && value?.includes('http') ?
                        <a href={value} className={'actor-detail-value'} target={'_blank'} title={detail?.name}>
                            External Link
                        </a> :
                        <span className={'actor-detail-value'}>{value}</span>
                    }
                </div>
            )
        })

    return (
        <div className={'actorDataDetails'}>
            {renderDetails}
        </div>
    );
};
export default ActorDetails;
