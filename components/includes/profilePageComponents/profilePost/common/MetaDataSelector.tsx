import {FC, useEffect, useMemo, useState} from "react";
import Select from 'react-select';
import styled from "styled-components";
import getMetaSuggestion from '@_variables/clientAjaxVariables/getMetaSuggestion'
import {Meta, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {uniqBy} from 'lodash'
import {useSelector} from "react-redux";

const MetaDataSelectorStyledDiv = styled.div`

`

interface ComponentPropTypes {
    type: string,
    onMetaChangeHandler: any,
    onChangeHandler: any,
}

const MetaDataSelector: FC<ComponentPropTypes> =
    ({
         type,
         onMetaChangeHandler,
     }) => {

        const editingPostData = useSelector(({posts}: StoreTypes) => posts?.editingPost)
        const [suggestion, setSuggestion] = useState([])
        const [isLoading, setIsLoading] = useState(false)

        const selectedValue = useMemo(() => editingPostData?.[type]?.map(meta => {
            return {value: meta._id, label: meta.name}
        }), [editingPostData?.[type]])

        const options = useMemo(() => {
            return suggestion.map((meta) => {
                return {value: meta._id, label: meta.name}
            })
        }, [suggestion])

        const onInputChangeHandler = (input) => {
            setIsLoading(true)
            getMetaSuggestion(type, input).then(res => {
                setSuggestion([...suggestion, ...(res.data?.metas || [])])
                setIsLoading(false)
            })
        }

        const onSelectHandler = (selected) => {
            const selectedIds = [...new Set(selected.map((meta) => meta.value))]
            const findSelectedMeta = [...suggestion, ...editingPostData?.[type]]
                                     .filter(meta => selectedIds.includes(meta._id))
            onMetaChangeHandler(uniqBy(findSelectedMeta, meta => meta._id), type)
        }


        return (
            <MetaDataSelectorStyledDiv>
                <div className="App">
                    <Select
                        // defaultValue={selectedOption}
                        name={type}
                        value={selectedValue}
                        onChange={onSelectHandler}
                        onInputChange={onInputChangeHandler}
                        isLoading={isLoading}
                        // options={options}
                        options={options}
                        isMulti={true}
                        // isClearable ={true}
                    />
                </div>
            </MetaDataSelectorStyledDiv>
        )
    };
export default MetaDataSelector
