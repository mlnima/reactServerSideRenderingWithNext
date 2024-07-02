import React, {ChangeEvent, ChangeEventHandler, FC, useEffect, useState} from "react";
import styled from "styled-components";

import MetasSection from "@components/pages/Backup/MetasSection";
import PostsSection from "@components/pages/Backup/PostsSection";
import {backup} from "@repo/api-requests";

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  .export-type-container {
    border: 1px solid;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 5px;
    width: 350px;


    .action-buttons, .fields {
      margin: 20px 0;
      display: flex;
      align-items: center;

      flex-wrap: wrap;

      button {
        margin: 0 20px;
      }
    }

    .fields {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;

      .field {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 4px;
      }
    }

    .limit-field {
      display: flex;
      align-items: center;

      .limit {
        width: 100px;
        margin: 0 8px;
      }
    }

  }
`;

interface PropTypes {

}

const Backup: FC<PropTypes> = ({}) => {

    const onBackupHandler = async ()=>{
        try {
            const backupResult = await backup()
            console.log(`backupData=> `,backupResult.data)
        }catch (error){
            console.log(`error=> `,error)
        }

    }

    return (
        <Style>
            <button className={'btn btn-primary'} onClick={onBackupHandler}>
                Backup
            </button>
            {/*<MetasSection/>*/}
            {/*<PostsSection/>*/}
            {/*<div className={'export-type-container'}>*/}
            {/*    <h2>General Backup config:</h2>*/}
            {/*</div>*/}
            {/*<div className={'export-type-container'}>*/}
            {/*    <h2>Posts:</h2>*/}
            {/*</div>*/}


            {/*<div className={'export-type-container'}>*/}
            {/*    <h2>Settings:</h2>*/}
            {/*</div>*/}

        </Style>
    )
};
export default Backup;