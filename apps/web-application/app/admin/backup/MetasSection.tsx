import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {dashboardAPIRequestBackupMetas} from "@repo/api-requests";
import FileDownload from 'js-file-download'

const Style = styled.div``;

interface PropTypes {
}

const MetasSection: FC<PropTypes> = ({}) => {


    const metaFields = [
        '_id',
        'description',
        'imageUrl',
        'translations',
        'index',
        'status',
        'imageUrlLock',
        'rankLock',
        'count',
        'likes',
        'views',
        'rank',
        'additionalInfo',
        'createdAt',
        'updatedAt',

    ]
    const [metasSelectedFields, setMetasSelectedFields] = useState(metaFields)
    const [metasLimit, setMetasLimit] = useState(1)

    const onMetasSelectedFieldsChangeHandler = (e: any) => {
        e.target.checked ?
            //@ts-ignore
            setMetasSelectedFields([...metasSelectedFields, e.target.name]):
            setMetasSelectedFields(metasSelectedFields.filter(field=>field != e.target.name))
    }

    const onBackupMetasHandler = (e: React.MouseEvent<HTMLElement>) => {
        const metaType = (e.target as any).name
        const now = Date.now()
        dashboardAPIRequestBackupMetas({
            metaType,
            fields :metasSelectedFields

        }).then((response:{data:any})=>{
            if (response?.data?.size){
                FileDownload(response.data,`${metaType}${now.toLocaleString()}.json`)
            }
        })
    }

    return (
        <Style className={'export-type-container'}>
            <h2>Metas:</h2>
            <div className="action-buttons">
                <button name={'categories'} className={'btn btn-primary'} onClick={e => onBackupMetasHandler(e)}>
                    Categories
                </button>
                <button name={'tags'} className={'btn btn-primary'} onClick={e => onBackupMetasHandler(e)}>
                    Tags
                </button>
                <button name={'actors'} className={'btn btn-primary'} onClick={e => onBackupMetasHandler(e)}>
                    Actors
                </button>
            </div>
            Exclude:
            <div className="fields">

                {metaFields.map(field => {
                    return (
                        <div className="field" key={field}>
                            <label>{field}</label>
                            <input className={'field'}
                                   type={'checkbox'}
                                   name={field}
                                //@ts-ignore
                                   checked={metasSelectedFields.includes(field)}
                                   onChange={e => onMetasSelectedFieldsChangeHandler(e)}/>
                        </div>
                    )
                })}

            </div>

            <div className={'limit-field'}>
                Limit:
                {/*//@ts-ignore*/}
                <input className={'primaryInput limit'} type="number" value={metasLimit} onChange={e=>setMetasLimit(e.target.value)}/>
            </div>
        </Style>
    )
};
export default MetasSection;
