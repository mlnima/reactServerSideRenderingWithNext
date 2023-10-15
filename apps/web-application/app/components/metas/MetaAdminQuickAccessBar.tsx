'use client';
import {FC} from "react";
import Link from "next/link";
import {useAppSelector} from "@store/hooks";

interface PropTypes {
    metaId:string
}

const MetaAdminQuickAccessBar: FC<PropTypes> = ({metaId}) => {
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);
    if (!adminMode) return null;
    return (
        <div>
            <Link href={'/dashboard/meta?id=' + metaId} className={'btn btn-primary'} target={'_blank'}>
                Edit
            </Link>
        </div>
    )
};
export default MetaAdminQuickAccessBar;