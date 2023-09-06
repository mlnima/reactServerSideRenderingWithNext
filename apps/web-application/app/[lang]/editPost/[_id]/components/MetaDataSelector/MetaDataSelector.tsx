'use client';
import React, {FC, useState, useMemo} from 'react';
import Select from 'react-select';
import {uniqArrayBy} from 'custom-util';
import {clientAPIRequestGetMetaSuggestion} from 'api-requests';
import {Meta} from 'typescript-types';
import './MetaDataSelector.styles.scss';

interface ComponentPropTypes {
    type: string;
    maxLimit: number;
    onMetaChangeHandler: (selectedMetas: Meta[], type: string) => void;
    postData: Record<string, Meta[]>;
}

interface SelectOption {
    value: string;
    label: string;
}

const MetaDataSelector: FC<ComponentPropTypes> = ({
                                                      type,
                                                      onMetaChangeHandler,
                                                      maxLimit,
                                                      postData,
                                                  }) => {
    const [suggestion, setSuggestion] = useState<Meta[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // const selectedValue = useMemo(() => {
    //     return (postData?.[type] || []).map((meta): SelectOption =>({value: meta._id, label: meta.name}));
    // }, [postData[type]]);

    const options = useMemo(() => {
        return suggestion.map((meta): SelectOption => {
            return {value: meta._id, label: meta.name};
        });
    }, [suggestion]);

    const onInputChangeHandler = async (input: string) => {
        setIsLoading(true);
        const res = await clientAPIRequestGetMetaSuggestion(type, input);
        setSuggestion([...suggestion, ...(res.data?.metas || [])]);
        setIsLoading(false);
    };

    const onSelectHandler = (selected: SelectOption[] | null) => {
        if (!selected || selected.length > maxLimit) return;

        const selectedIds = new Set(selected.map((meta) => meta.value));
        const findSelectedMeta = [...suggestion, ...(postData[type] || [])].filter((meta) =>
            selectedIds.has(meta._id)
        );
//@ts-ignore
        onMetaChangeHandler(uniqArrayBy(findSelectedMeta, '_id'), type);
    };

    return (
        <div className="metaDataSelector">
            <div className="App">
                <Select
                    name={type}
                    value={(postData?.[type] || []).map((meta): SelectOption =>({value: meta._id, label: meta.name}))}
                    onChange={(val) => onSelectHandler(val as SelectOption[])}
                    onInputChange={(input) => onInputChangeHandler(input)}
                    isLoading={isLoading}
                    options={options}
                    isMulti
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'var(--primary-text-color,#fff)',
                            backgroundColor: 'var(--primary-background-color,#000)',
                        }),
                    }}
                />
            </div>
        </div>
    );
};

export default MetaDataSelector;


// import {FC,  useMemo, useState} from "react";
// import Select from 'react-select';
// import {uniqArrayBy} from "custom-util";
// import {clientAPIRequestResetMetaImage} from "api-requests";
// import {Meta} from "typescript-types";
// import './MetaDataSelector.styles.scss'
//
// interface ComponentPropTypes {
//     type: string,
//     maxLimit: number,
//     onMetaChangeHandler: any,
//     postData:{}
// }
//
// const MetaDataSelector: FC<ComponentPropTypes> =
//     ({
//          type,
//          onMetaChangeHandler,
//          maxLimit,
//          postData
//      }) => {
//         const [suggestion, setSuggestion] = useState<Meta[]>([])
//         const [isLoading, setIsLoading] = useState(false)
//
//         const selectedValue = useMemo(() => (postData?.[type] || []).map(meta => {
//             return {value: meta._id, label: meta.name}
//         }), [postData?.[type]])
//
//         const options = useMemo(() => {
//             return suggestion.map((meta:Meta) => {
//                 return {value: meta._id, label: meta.name}
//             })
//         }, [suggestion])
//
//         const onInputChangeHandler = (input) => {
//             setIsLoading(true)
//             clientAPIRequestResetMetaImage(type, input).then(res => {
//                 setSuggestion((prevState) => ([...prevState, ...(res.data?.metas || [])]))
//                 setIsLoading(false)
//             })
//         }
//
//         const onSelectHandler = (selected) => {
//             if (selected?.length > maxLimit) return
//             const selectedIds = [...new Set(selected.map((meta) => meta.value))]
//             const findSelectedMeta = [...suggestion, ...postData?.[type]]
//                                      .filter(meta => selectedIds.includes(meta._id))
//             // onMetaChangeHandler(uniqBy(findSelectedMeta, meta => meta._id), type)
//             onMetaChangeHandler(uniqArrayBy(findSelectedMeta, '_id'), type)
//         }
//
//
//         return (
//             <div className={'metaDataSelector'}>
//                 <div className="App">
//                     <Select
//                         name={type}
//                         value={selectedValue}
//                         onChange={onSelectHandler}
//                         onInputChange={onInputChangeHandler}
//                         isLoading={isLoading}
//
//                         options={options}
//                         isMulti={true}
//                         styles={{
//                             control: (baseStyles, state) => ({
//                                 ...baseStyles,
//                                 color: 'var(--primary-text-color,#fff)',
//                                 backgroundColor:' var(--primary-background-color,#000)',
//
//                             }),
//                         }}
//                     />
//                 </div>
//             </div>
//         )
//     };
// export default MetaDataSelector
