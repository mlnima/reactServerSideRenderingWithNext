'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LanguagesOptions } from '@repo/ui';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import { IMeta } from '@repo/typescript-types';
import dashboardGetMeta from '@lib/actions/database/operations/metas/dashboardGetMeta';
import dashboardDeleteMeta from '@lib/actions/database/operations/metas/dashboardDeleteMeta';
import dashboardUpdateMeta from '@lib/actions/database/operations/metas/dashboardUpdateMeta';


const EditMetaPage = () => {
  const dispatch = useAppDispatch();
  const [meta, setMeta] = useState<IMeta | null>(null);

  const searchParams = useSearchParams();

  const { id, newMeta, metaType, lang } = useMemo(() => ({
    id: searchParams.get('id'),
    newMeta: searchParams.get('new'),
    metaType: searchParams.get('metaType'),
    lang: searchParams.get('lang'),
  }), [searchParams]);

  const [editingData,setEditingData ] = useState({ activeEditingLanguage: 'default' });
  const [deleteButton, setDeleteButton] = useState(false);

  useEffect(() => {
    if (newMeta) {

      setMeta({
        name: '',
        type: metaType || 'categories',
        description: '',
        imageUrl: '',
        imageUrlLock: false,
        translations: {},
        count: 0,
      })
      setEditingData({lang: lang || 'default'})
    } else if (id) {
      initialMeta()
    }
  }, [id, newMeta]);

  const initialMeta = async () => {
    try {
      if (!id) return;
      const { success, data, message } = await dashboardGetMeta(id);

      if (!success || !data || !data.meta) return;

      setMeta(data.meta)

    } catch (error) {
    }
  };


  const onActiveEditingLanguageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditingData({ ...editingData, activeEditingLanguage: e.target.value });
  };

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingData.activeEditingLanguage === 'default') {

      setMeta((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    } else {
      // @ts-expect-error: it's fine
      setMeta((prevState)=>({
        ...prevState,
        translations: {
          ...(prevState?.translations || {}),
          [editingData.activeEditingLanguage]: {
            ...(prevState?.translations?.[editingData.activeEditingLanguage] || {}),
            [e.target.name]: e.target.value,
          },
        },e
      }))
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMeta((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  if (!meta) return <h1>Not Found</h1>;

  return (
    <div className="EditMetaPage">
      {!!meta?.type && <label>Type: {meta?.type}</label>}
      <div className={'single-meta-page-section'}>
        <p>Language :</p>
        <select className={'primarySelect'} onChange={onActiveEditingLanguageChangeHandler}>
          <option value="default">Default</option>
          <LanguagesOptions languages={process.env.NEXT_PUBLIC_LOCALES || ''} />
        </select>
      </div>
      <div className={'single-meta-page-section'}>
        <p>Meta Name :</p>
        <input
          className={'primaryInput'}
          name="name"
          onChange={onInputChangeHandler}
          // @ts-ignore
          value={
            editingData.activeEditingLanguage === 'default' ? meta.name : meta?.translations ?
              // @ts-ignore
              meta.translations[editingData.activeEditingLanguage] ?
                // @ts-ignore
                meta.translations[editingData.activeEditingLanguage].name || '' : ''
              : ''
          }
        />
      </div>
      <div className={'single-meta-page-section'}>
        <p>Meta Image :</p>
        {/*// @ts-ignore*/}
        <input
          className={'primaryInput'}
          name={'imageUrl'}
          onChange={onChangeHandler}
          value={meta?.imageUrl || ''}
        />
      </div>
      <div className={'single-meta-page-section'}>
        <p>Count :</p>
        {/*// @ts-ignore*/}
        <input
          type={'number'}
          className={'primaryInput'}
          name={'count'}
          onChange={onChangeHandler}
          value={meta?.count || 0}
        />
      </div>
      <div className={'single-meta-page-section'}>
        <p>Likes :</p>
        {/*// @ts-ignore*/}
        <input
          type={'number'}
          className={'primaryInput'}
          name={'likes'}
          onChange={onChangeHandler}
          value={meta?.likes || 0}
        />
      </div>
      <div className={'single-meta-page-section'}>
        <p>Views :</p>
        {/*// @ts-ignore*/}
        <input
          type={'number'}
          className={'primaryInput'}
          name={'views'}
          onChange={onChangeHandler}
          value={meta?.views || 0}
        />
      </div>
      <div className={'single-meta-page-section'}>
        <p>Rank :</p>
        <input
          type={'number'}
          className={'primaryInput'}
          name={'rank'}
          onChange={onChangeHandler}
          value={meta?.rank || 0}
        />
      </div>
      {meta?.type === 'categories' && (
        <div className={'single-meta-page-section'}>
          <p>Parent Id :</p>
          <input
            type={'text'}
            className={'primaryInput'}
            name={'parentId'}
            onChange={onChangeHandler}
            value={meta?.parentId || ''}
          />
        </div>
      )}
      <div className={'single-meta-page-section preview-image'}>
        {meta?.imageUrl ? <img src={meta.imageUrl} alt="" /> : null}
      </div>
      <div className={'single-meta-page-section'}>
        <p>Lock Meta Image :</p>
        <input
          type={'checkbox'}
          checked={meta.imageUrlLock}
          name={'imageUrlLock'}
          onChange={(e) => setMeta((prevState)=>({ ...prevState, imageUrlLock: e.target.checked })) }
        />
      </div>
      <div className={'single-meta-page-section'}>
        <p>Type :</p>
        <select className={'primarySelect'} name={'type'} onChange={onChangeHandler} value={meta?.type}>
          <option value="">Select</option>
          <option value="tags">Tag</option>
          <option value="categories">Category</option>
          <option value="actors">Actor</option>
        </select>
      </div>
      <div className={'single-meta-page-section'}>
        <p>Status :</p>
        <select className={'primarySelect'} name={'status'} onChange={onChangeHandler} value={meta?.status}>
          <option value="">Select</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="trash">Trash</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className={'single-meta-page-section'}>
        <p>Meta Description :</p>
        <textarea
          className={'primaryInput'}
          name={'description'}
          onChange={onInputChangeHandler}
          // @ts-ignore
          value={
            editingData?.activeEditingLanguage && editingData?.activeEditingLanguage === 'default' ? meta?.description || '' : meta?.translations ?
              // @ts-ignore
              meta.translations[editingData.activeEditingLanguage] ?
                // @ts-ignore
                meta.translations[editingData.activeEditingLanguage].description || '' : ''
              : ''
          }
        />
      </div>
      <div className="action-buttons">
        <button className="btn btn-primary" onClick={async () => await dashboardUpdateMeta(meta)}>Update</button>
        {!deleteButton && (
          <button className={'btn btn-danger'} onClick={() => setDeleteButton(true)}>I Want To Delete This Meta</button>
        )}
        {(deleteButton && id) && (
          <button onClick={async () => id ? dashboardDeleteMeta(id) : null} className="btn btn-danger">Delete</button>
        )}
      </div>
    </div>
  );
};

export default EditMetaPage;

