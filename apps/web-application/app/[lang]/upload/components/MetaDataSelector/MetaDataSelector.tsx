'use client';
import React, { FC, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { uniqArrayBy } from '@repo/shared-util';
import { clientAPIRequestGetMetaSuggestion } from '@repo/api-requests';
import { Meta } from '@repo/typescript-types';
import './MetaDataSelector.styles.scss';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { reactSelectPrimaryTheme } from '@repo/data-structures';

interface ComponentPropTypes {
    metaType: string;
    maxLimit: number;
    onMetaChangeHandler: (selectedMetas: Meta[], metaType: string) => void;
    postData: Record<string, Meta[]>;
}

interface SelectOption {
    value: string;
    label: string;
}

const MetaDataSelector: FC<ComponentPropTypes> = ({ metaType, onMetaChangeHandler, maxLimit, postData }) => {
    const dispatch = useAppDispatch();

    const onSelectHandler = (selected: SelectOption[] | null) => {
        if (!selected) return;

        if (selected?.length > maxLimit) {
            dispatch(
                setAlert({
                    message: `Maximum ${metaType} reached`,
                    type: 'error',
                }),
            );
            return
        }

        const convertSelectedMetas = selected.map(selectedMeta => ({
            name: selectedMeta.label,
            _id: selectedMeta.value,
        }));

        onMetaChangeHandler(uniqArrayBy(convertSelectedMetas, '_id'), metaType);


    };

    const onLoadOptionsHandler = async (input: string) => {
        try {
            const suggestionList = await clientAPIRequestGetMetaSuggestion(metaType, input);
            if (suggestionList.data?.metas?.length) {
                const reducedResult = suggestionList.data.metas.reduce(
                    (
                        final: {
                            value: string;
                            label: string;
                        }[],
                        current: { _id: string; name: string },
                    ) => {
                        final = [...final, { value: current._id, label: current.name }];
                        return final;
                    },
                    [],
                );
                return reducedResult;
            } else return [];
        } catch (error) {
            return [];
        }
    };



    return (
        <div className="metaDataSelector">


            <AsyncSelect
                name={metaType}
                className={'reactSelectComponent'}
                onChange={val => onSelectHandler(val as SelectOption[])}
                loadOptions={onLoadOptionsHandler}
                isMulti
                value={(postData?.[metaType] || []).map(
                    (meta): SelectOption => ({ value: meta._id, label: meta.name }),
                )}
                styles={reactSelectPrimaryTheme}
            />
        </div>
    );
};

export default MetaDataSelector;

// const onInputChangeHandler = (input: string) => {
//     if (!!input) {
//         setIsLoading(true);
//         clientAPIRequestGetMetaSuggestion(metaType, input)
//             .then(response => {
//                 setSuggestion(response.data?.metas || []);
//                 setIsLoading(false);
//             })
//             .catch(error => {
//                 console.log('error=> ', error);
//             });
//     }
// };

// useEffect(() => {
//     setOptions(
//         suggestion.map((meta): SelectOption => {
//             return { value: meta._id, label: meta.name };
//         }),
//     );
// }, [suggestion]);

// else if (!!selected && selected.length > maxLimit && user.userData?.role !== 'administrator') {
//
//
//         dispatch(
//             setAlert({
//                 message: `Maximum ${metaType} reached`,
//                 type: 'error',
//             }),
//         );
//     }

// <Select
//     name={type}
//     value={(postData?.[type] || []).map((meta): SelectOption => ({ value: meta._id, label: meta.name }))}
//     onChange={val => onSelectHandler(val as SelectOption[])}
//     onInputChange={input => onInputChangeHandler(input)}
//     isLoading={isLoading}
//     options={options}
//     className={'reactSelectComponent'}
//     classNamePrefix={'react-select'}
//     isMulti
//     styles={{
//         control: (baseStyles, state) => ({
//             ...baseStyles,
//             color: 'var(--secondary-text-color,#b3b3b3)',
//             backgroundColor: 'var(--secondary-background-color,#000)',
//             border: 'var(--default-border)',
//             borderRadius: '.375rem',
//         }),
//     }}
// />

// if (selected?.length > 0) {
//     const convertSelectedMetas = selected.map(selectedMeta => ({
//         name: selectedMeta.label,
//         _id: selectedMeta.value,
//     }));
//
//     // const selectedIds = new Set(convertSelectedMetas.map(meta => meta._id));
//     //removing a meta
//     // const findSelectedMeta = [...suggestion, ...(postData[metaType] || [])].filter(meta =>
//     //     selectedIds.has(meta._id),
//     // );
//     //@ts-ignore
//     onMetaChangeHandler(uniqArrayBy(convertSelectedMetas, '_id'), metaType);
// } else {
//     const selectedIds = new Set(selected.map(meta => meta._id));
//     const findSelectedMeta = [...suggestion, ...(postData[metaType] || [])].filter(meta =>
//         selectedIds.has(meta._id),
//     );
//     //@ts-ignore
//     onMetaChangeHandler(uniqArrayBy(findSelectedMeta, '_id'), metaType);
// }