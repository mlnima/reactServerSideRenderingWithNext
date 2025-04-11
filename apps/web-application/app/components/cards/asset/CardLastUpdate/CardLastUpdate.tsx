import {FC, useMemo} from "react";
import {formatDistance} from 'date-fns';
import { faIR } from "date-fns/locale/fa-IR";

interface CardLastUpdatePropTypes {
    targetedDate: string | Date,
    locale:string
}

const CardLastUpdate: FC<CardLastUpdatePropTypes> = ({targetedDate,locale}) => {

    const distanceToNow = useMemo(() => {
        const activeLocaleData = locale === 'fa' ? {locale: faIR} : {}
        const options = {...activeLocaleData, addSuffix: true}
        try {
            return formatDistance(new Date(targetedDate), new Date(), options)
        } catch {
            return null
        }
    }, [targetedDate,locale])

    return (
        <span className={'last-update'}>
            {distanceToNow}
        </span>
    )
};

export default CardLastUpdate
