import {FC} from "react";
import Link from "next/link";
import styled from "styled-components";
const Style = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: clamp(300px ,600px, 100%);
`
const TopbarQuickAccess = () => {
    return (
        <Style>
            <Link href={'/admin/design/widgets'}>Widgets</Link>
            <Link href={'/admin/assets?assetsType=posts'}>Posts</Link>
            <Link href={'/admin/design/customColors'}>Colors</Link>
            <Link href={'/admin/settings/general'}>General Settings</Link>
        </Style>
    )
};
export default TopbarQuickAccess
