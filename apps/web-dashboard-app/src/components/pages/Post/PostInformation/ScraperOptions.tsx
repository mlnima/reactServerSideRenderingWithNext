import React, {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {inputValueSimplifier} from "custom-util";
import {useAppDispatch} from "@store/hooks";
import {getPostScrapedDataAction} from "@store/reducers/postsReducer";

const Style = styled.div`
  .filed-checkboxes {
    display: flex;
    align-items: center;
    gap: 5px;

    .filed-checkbox {
      display: flex;
      align-items: center;
      background-color: var(--main-background-color, #000);
      padding: 4px;
      box-sizing: border-box;
      border-radius: 5px;
    }
  }

  .action-buttons {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 5px;
    gap: 5px;
  }

`;

interface PropTypes {
    sourceURL:string
}


const ScraperOptions: FC<PropTypes> = ({sourceURL}) => {
    const dispatch = useAppDispatch()
    const [fields, setFields] = useState<any>([])
    const availableFields = [
        'actors',
        'categories',
        'tags',
        'title',
        'videoEmbedCode',
        'videoTrailerUrl',
        'description',
        'duration',
        'mainThumbnail',
        'postType',
        'quality',
        'source',
        'sourceSite',
    ]


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = inputValueSimplifier(e)
        const newStateData = isChecked ? [...fields, e.target.name] : fields.filter((field: string) => field != e.target.name)
        setFields(newStateData)
        localStorage.setItem('adminEditingPostPageScrapperFields', JSON.stringify(newStateData))

    }

    useEffect(() => {
        if (localStorage.adminEditingPostPageScrapperFields) {
            setFields(JSON.parse(localStorage.adminEditingPostPageScrapperFields))
        }
    }, []);

    // useEffect(() => {
    //     console.log(fields)
    // }, [fields]);

    return (
        <Style>
            <span>Scrapper Options:</span>
            <div className={'filed-checkboxes'}>
                {availableFields.map((field: string) => {
                    return (
                        <div className={'filed-checkbox'}>
                            <label>{field}</label>
                            <input type={'checkbox'}
                                   name={field}
                                   onChange={(e) => onChangeHandler(e)}
                                   value={field}
                                   checked={fields.includes(field)}/>
                        </div>
                    )
                })}
            </div>

            <div className={'action-buttons'}>

                <button onClick={() => setFields(availableFields)} className={'btn btn-info'}>all</button>
                <button onClick={() => setFields([])} className={'btn btn-info'}>clear</button>
                <button onClick={() =>dispatch(getPostScrapedDataAction({url:sourceURL}))} className={'btn btn-primary'}>
                    Scrap All
                </button>
                <button className={'btn btn-primary'}
                        onClick={()=>{
                            dispatch(getPostScrapedDataAction({
                                url:sourceURL,
                                fields
                            }))}
                        }>
                    scrap limited
                </button>
            </div>



        </Style>
    )
};
export default ScraperOptions;
