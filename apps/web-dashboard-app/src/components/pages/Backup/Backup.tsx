import {FC, useEffect, useState} from "react";
import styled from "styled-components";

const Style = styled.div`
  .export-type-container {
    border: var('--default-border');

    .action-buttons, .fields {
      margin: 20px 0;
      display: flex;
      align-items: center;
    }

    button {
      margin: 0 20px;
    }
  }
`;

interface PropTypes {

}

const Backup: FC<PropTypes> = ({}) => {
    const [metasSelectedFields, setMetasSelectedFields] = useState([])


    const onMetasSelectedFieldsChangeHandler = (e: any) => {
        setMetasSelectedFields([
            //@ts-ignore
            ...metasSelectedFields,
            //@ts-ignore
            e.target.value
        ])
    }

    const onBackupMetasHandler = () => {

    }


    return (
        <Style>
            <div className={'export-type-container'}>
                <h2>General Backup config:</h2>
            </div>
            <div className={'export-type-container'}>
                <h2>Posts:</h2>
            </div>

            <div className={'export-type-container'}>
                <h2>Metas:</h2>
                <div className="action-buttons">
                    <button className={'btn btn-primary'}>Categories</button>
                    <button className={'btn btn-primary'}>Tags</button>
                    <button className={'btn btn-primary'}>Actors</button>
                </div>
                <div className="fields">
                    <div className="field">
                        <label>description</label>
                        <input className={'field'}
                               type={'checkbox'}
                               value={'description'}
                               onChange={e => onMetasSelectedFieldsChangeHandler(e)}/>
                    </div>
                    <div className="field">
                        <label>imageUrl</label>
                        <input name={'imageUrl'} className={'field'} type={'checkbox'} value={'imageUrl'}
                               onChange={e => onMetasSelectedFieldsChangeHandler(e)}/>
                    </div>
                    <div className="field">
                        <label>translations</label>
                        <input name={'translations'} className={'field'} type={'checkbox'} value={'translations'}
                               onChange={e => onMetasSelectedFieldsChangeHandler(e)}/>
                    </div>
                    <div className="field">
                        <label>additionalInfo</label>
                        <input name={'additionalInfo'} className={'field'} type={'checkbox'} value={'additionalInfo'}
                               onChange={e => onMetasSelectedFieldsChangeHandler(e)}/>
                    </div>
                </div>
            </div>
            <div className={'export-type-container'}>
                <h2>Settings:</h2>
            </div>

        </Style>
    )
};
export default Backup;