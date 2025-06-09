// @ts-nocheck
'use client';
import React, { useRef } from 'react';
import { useAppDispatch } from "@store/hooks";
import dashboardCreateNewWidget from '@lib/actions/database/widgets/dashboardCreateNewWidget';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useRouter } from 'next/navigation';

const WidgetImporter = (): JSX.Element => {
    const inputFile = useRef(null);
    const router = useRouter()
    const dispatch = useAppDispatch();

    const onLoadHandler = async (e: any) => {
        try {
            const widgets = JSON.parse(e.target.result);
            for await (let widget of widgets) {
             // dispatch(createNewWidgetAction(widget));

              const { success, message, error } = await dashboardCreateNewWidget(widget);

              if (!success ) {
                console.log(`getPostsAction Error=> `, error);
                dispatch(
                  setAlert({
                    message,
                    type: 'Error',
                  }),
                );
                return;
              }
            }
            router.refresh()
        } catch (error) { }
    };

    return (
        <div className='import-widgets'>
            <input ref={inputFile} style={{ display: 'none' }} type='file' onChange={async (e) => {
                const reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                reader.onload = async (e) => onLoadHandler(e);
            }} />
            <button className='btn btn-primary' onClick={() => inputFile.current.click()}>
                Import Widget
            </button>
        </div>
    );
};

export default WidgetImporter;