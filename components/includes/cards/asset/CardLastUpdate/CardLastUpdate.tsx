import {FC, useMemo} from "react";
import {formatDistance} from 'date-fns';
import {useRouter} from "next/router";
import faIR from "date-fns/locale/fa-IR";

interface CardLastUpdatePropTypes {
    targetedDate: string | Date
}

const CardLastUpdate: FC<CardLastUpdatePropTypes> = ({targetedDate}) => {
    const {locale} = useRouter()

    const distanceToNow = useMemo(() => {
        const activeLocaleData = locale === 'fa' ? {locale: faIR} : {}
        const options = {...activeLocaleData, addSuffix: true}
        try {
            return formatDistance(new Date(targetedDate), new Date(), options)
        } catch (err) {
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
