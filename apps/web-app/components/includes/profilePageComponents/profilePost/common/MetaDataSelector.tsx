import {FC,  useMemo, useState} from "react";
import Select from 'react-select';
import styled from "styled-components";
import {uniqArrayBy} from "custom-util";
import getMetaSuggestion from "api-requests/src/client/metas/getMetaSuggestion";
import {Meta} from "typescript-types";

const MetaDataSelectorStyledDiv = styled.div`
  width: 100%;
  color: var( --secondary-text-color,#ccc);
  background: var(--secondary-background-color,#181818) ;
`

interface ComponentPropTypes {
    type: string,
    maxLimit: number,
    onMetaChangeHandler: any,
    postData:{}
}

const MetaDataSelector: FC<ComponentPropTypes> =
    ({
         type,
         onMetaChangeHandler,
         maxLimit,
         postData
     }) => {
        const [suggestion, setSuggestion] = useState<Meta[]>([])
        const [isLoading, setIsLoading] = useState(false)

        const selectedValue = useMemo(() => postData?.[type]?.map(meta => {
            return {value: meta._id, label: meta.name}
        }), [postData?.[type]])

        const options = useMemo(() => {
            return suggestion.map((meta:Meta) => {
                return {value: meta._id, label: meta.name}
            })
        }, [suggestion])

        const onInputChangeHandler = (input) => {
            setIsLoading(true)
            getMetaSuggestion(type, input).then(res => {
                //need to be tested for performance
                setSuggestion((prevState) => ([...prevState, ...(res.data?.metas || [])]))
                setIsLoading(false)
            })
        }

        const onSelectHandler = (selected) => {
            if (selected?.length > maxLimit) return
            const selectedIds = [...new Set(selected.map((meta) => meta.value))]
            const findSelectedMeta = [...suggestion, ...postData?.[type]]
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
                                color: 'var(--main-text-color, #fff)',
                                backgroundColor:' var(--main-background-color, #000)',

                            }),
                        }}
                        // isClearable ={true}
                    />
                </div>
            </MetaDataSelectorStyledDiv>
        )
    };
export default MetaDataSelector
