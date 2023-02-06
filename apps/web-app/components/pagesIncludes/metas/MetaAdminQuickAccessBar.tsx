import {FC} from "react";
import styled from "styled-components";
import Link from "next/link";

const Style = styled.div``;

interface PropTypes {
    metaId:string
}

const MetaAdminQuickAccessBar: FC<PropTypes> = ({metaId}) => {
    return (
        <Style>
            <Link href={'/admin/meta?id=' + metaId} className={'btn btn-primary'} target={'_blank'}>
                Edit
            </Link>
        </Style>
    )
};
export default MetaAdminQuickAccessBar;