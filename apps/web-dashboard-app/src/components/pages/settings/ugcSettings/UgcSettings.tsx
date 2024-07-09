import {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";

const Style = styled.div``;

interface PropTypes {
}

const UgcSettings: FC<PropTypes> = ({}) => {
    const initialSettingsData = useSelector(({settings}: DashboardStore) => settings?.ugcSettings);
    return (
        <Style>

        </Style>
    )
};
export default UgcSettings;
