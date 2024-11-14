//UsersRole.tsx
import React, {FC, useMemo} from "react";
import styled from "styled-components";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "@variables/paramsObjectGenerator";
import { userRoles } from '@repo/data-structures';
import {capitalizeFirstLetter} from "@repo/shared-util";

const Style = styled.div``;

interface PropTypes {
}

const UsersRole: FC<PropTypes> = ({}) => {
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(() => paramsObjectGenerator(search), [search]);

    const onRoleChangeHandler = (e: React.ChangeEvent<any>) => {
        if (e.target.value) {
            setSearch({ ...query, role: e.target.value });
        } else {
            const newQuery = { ...query };
            delete newQuery.role;
            setSearch({ ...newQuery });
        }
    };

    return (
        <Style className="assetControlItem">
            <select className={'primarySelect'} onChange={onRoleChangeHandler}>
                <option value="">Select</option>
                {userRoles.map(role=>(
                    <option key={role} value={role}>
                        {capitalizeFirstLetter(role)}
                    </option>
                ))}
            </select>

    </Style>
    )
};
export default UsersRole;
