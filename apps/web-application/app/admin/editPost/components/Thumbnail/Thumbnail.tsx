'use client';
import { FC } from 'react';
import './style.scss';
import { IFile } from '@repo/typescript-types';
import { useDispatch } from 'react-redux';
import { setAlert } from '@store/reducers/globalStateReducer';

interface IProps {
  thumbnail: IFile;
  postId:string
}

const Thumbnail: FC<IProps> = ({ thumbnail,postId }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = ()=>{
    console.log(`onDeleteHandler=> `,)
  }
  const onChangeThumbnailHandler = ()=>{
    console.log(`onChangeThumbnailHandler=> `,)
  }
  return (
    <div id={'Thumbnail'}>
      <img src={thumbnail.filePath} alt="Thumbnail" />
      <div className={'action-buttons'}>
        <button className="btn btn-primary">Change</button>
        <button className="btn btn-danger" onClick={()=> dispatch(setAlert({
          message: "Do you really want to remove this Thumbnail?",
          type:'deleteAction',
          actionFunctions: onDeleteHandler
        }))}>Delete</button>
      </div>
    </div>
  );
};
export default Thumbnail;
