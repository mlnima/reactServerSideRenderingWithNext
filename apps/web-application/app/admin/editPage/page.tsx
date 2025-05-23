'use client';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useAppDispatch } from '@store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles.scss';
import dashboardGetPage from '@lib/actions/database/pages/dashboardGetPage';
import { setAlert } from '@store/reducers/globalStateReducer';
import { IPage } from '@repo/typescript-types';
import dashboardUpdatePage from '@lib/actions/database/pages/dashboardUpdatePage';
import dashboardDeletePage from '@lib/actions/database/pages/dashboardDeletePage';

const EditPage = (props: any) => {

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openStyleEditor, setOpenStyleEditor] = useState(false);
  const pageId = useMemo(() => searchParams.get('id'), [searchParams]);

  const [pageData, setPageData] = useState<IPage | null>(null);


  const getPageData = async (_id: string) => {
    const { success, message, data, error } = await dashboardGetPage({ _id });
    if (!success || !data) {
      dispatch(
        setAlert({
          message,
          type: 'Error',
          err: error,
        }),
      );
      return;
    }

    setPageData(data.pageData);
  };


  useEffect(() => {
    const _id = searchParams.get('id');
    if (_id) {
      getPageData(_id);
    } else {
      setPageData({
        title: '',
        pageName: '',
        description: '',
        keywords: '',
        status: 'draft',
        sidebar: 'no',
      });
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(`pageData=> `,pageData);
  }, [pageData]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const finalValue = e.target.value === 'true' ? true :
      e.target.value === 'false' ? false :
        e.target.value;

    // @ts-expect-error: it's fine-
    setPageData((prevState) => ({
      ...(prevState || {}),
      [e.target.name]: finalValue,
    }));

  };

  const onStyleChangeHandler = (value: string) => {
    // @ts-expect-error: it's fine-
    setPageData((prevState) => ({
      ...(prevState || {}),
      pageStyle: value,
    }));

  };


  const onSaveHandler = async () => {

    try {
      if (pageData) {
        const { success, message, data, error } = await dashboardUpdatePage({ pageData });
        if (!success || !data) {
          dispatch(
            setAlert({
              message,
              type: 'Error',
              err: error,
            }),
          );
          return;
        }

        setPageData(data.updatedPage);
      }

    } catch (error) {

    }
    // if (pageId) {
    //   const { success, message, data, error } = await dashboardUpdatePage({ pageData });
    //   dispatch(updatePageAction(pageData));
    // } else {
    //   dispatch(createNewPageAction({ pageData }));
    // }
  };

  const onDeleteHandler = async () => {
    if (!pageId)return;
    await dashboardDeletePage({_id:pageId})
    router.push('/admin/assets?assetsType=pages', { scroll: false });
  };

  return (
    <>
      <div className={'EditPage'}>
        <div className={'form-group'}>
          <p>Page Name (without Space):</p>
          <input name={'pageName'}
                 className={'primaryInput'}
                 type={'text'}
                 placeholder={'page name'}
                 value={pageData?.pageName || ''}
                 onChange={e => onChangeHandler(e)} />
        </div>
        <div className={'form-group'}>
          <p>Title:</p>
          <input name={'title'}
                 className={'primaryInput'}
                 placeholder={'title'}
                 type={'text'}
                 value={pageData?.title  || ''}
                 onChange={e => onChangeHandler(e)} />
        </div>
        <div className={'form-group'}>
          <p>Description:</p>
          <textarea name={'description'}
                    className={'primaryInput'}
                    placeholder={'description'}
                    value={pageData?.description  || ''}
            //@ts-ignore
                    onChange={e => onChangeHandler(e)} />
        </div>
        <div className={'form-group'}>
          <p>Sidebar:</p>
          <select name={'sidebar'} className={'primarySelect'} onChange={e => onChangeHandler(e)}
                  value={pageData?.sidebar}>
            <option value={'no'}>No</option>
            <option value={'left'}>Left</option>
            <option value={'right'}>Right</option>
            <option value={'both'}>Both</option>

          </select>
        </div>
        <div className={'form-group'}>
          <p>status:</p>
          <select name={'status'} className={'primarySelect'} onChange={e => onChangeHandler(e)}
                  value={pageData?.status}>
            <option>select</option>
            <option value={'published'}>Published</option>
            <option value={'draft'}>Draft</option>
            <option value={'trash'}>Trash</option>
          </select>
        </div>
        <button className={'btn btn-primary'} onClick={() => setOpenStyleEditor(!openStyleEditor)}>Custom Styles:
        </button>
        {openStyleEditor && <Editor
          language={'scss'}
          width={props.width || '100%'}
          height={props.height || '80vh'}
          theme={'vs-dark'}
          defaultValue={pageData?.pageStyle || ''}
          value={pageData?.pageStyle || ''}
          //@ts-ignore
          onChange={onStyleChangeHandler}
        />}

        <div className={'actions-btns'}>
          <button onClick={onSaveHandler} className={'btn btn-primary'}>Save</button>
          <button onClick={onDeleteHandler} className={'btn btn-danger'}>Delete</button>
        </div>

      </div>

    </>
  );
};

export default EditPage;