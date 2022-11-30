import {FC,  useMemo, useState} from "react";
import Select from 'react-select';
import styled from "styled-components";
import getMetaSuggestion from '@_variables/_clientVariables/clientAjaxVariables/getMetaSuggestion'
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {uniqArrayBy} from "custom-util";

const MetaDataSelectorStyledDiv = styled.div`
  width: 300px;
  color: var( --secondary-text-color,#ccc);
  background: var(--secondary-background-color,#181818) ;
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

        const editingPostData = useSelector(({posts}: Store) => posts?.editingPost)
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
            // onMetaChangeHandler(uniqBy(findSelectedMeta, meta => meta._id), type)
            onMetaChangeHandler(uniqArrayBy(findSelectedMeta, '_id'), type)
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
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                color: 'var( --secondary-text-color,#ccc)',
                                backgroundColor:' var(--secondary-background-color,#181818)',

                            }),
                        }}
                        // isClearable ={true}
                    />
                </div>
            </MetaDataSelectorStyledDiv>
        )
    };
export default MetaDataSelector
