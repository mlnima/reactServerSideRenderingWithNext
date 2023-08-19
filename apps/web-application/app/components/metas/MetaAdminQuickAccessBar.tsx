'use client';
import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import {useAppSelector} from "@store/hooks";

const Style = styled.div``;

interface PropTypes {
    metaId:string
}

const MetaAdminQuickAccessBar: FC<PropTypes> = ({metaId}) => {
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);
    if (!adminMode) return null;
    return (
        <Style>
            <Link href={'/dashboard/meta?id=' + metaId} className={'btn btn-primary'} target={'_blank'}>
                Edit
            </Link>
        </Style>
    )
};
export default MetaAdminQuickAccessBar;