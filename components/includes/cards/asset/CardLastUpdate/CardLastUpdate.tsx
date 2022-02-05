import {FC} from "react";
import {formatDistance} from 'date-fns';
import {useRouter} from "next/router";
import faIR from "date-fns/locale/fa-IR";

interface CardLastUpdatePropTypes {
    updatedAt: string | Date
}

const CardLastUpdate: FC<CardLastUpdatePropTypes> = ({updatedAt}) => {
    const currentLocale = useRouter()?.locale
    const locale = currentLocale === 'fa' ? {locale: faIR} : {}

    const options = {
        ...locale,
        addSuffix: true
    }

    return (
        <span className={'last-update'} >

            {formatDistance(new Date(updatedAt), new Date(), options)}
        </span>
    )
};

export default CardLastUpdate
