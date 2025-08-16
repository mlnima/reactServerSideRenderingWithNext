import { FC } from 'react';
import { IFile, IPost } from '@repo/typescript-types';
import { useDispatch } from 'react-redux';
import { setAlert } from '@store/reducers/globalStateReducer';
import InternalVideoPlayer
  from '../../../../../[lang]/post/[postType]/[identifier]/components/VideoTypePostPage/InternalVideoPlayer/InternalVideoPlayer';
import './style.scss'

interface IProps {
  videoData: IFile;
  post: IPost;
}

const VideoFile: FC<IProps> = ({ videoData, postId }) => {
  const dispatch = useDispatch();

  const onDeleteHandler = ()=>{
    console.log(`onDeleteHandler=> `,)
  }
  const onChangeVideoHandler = ()=>{
    console.log(`onChangeThumbnailHandler=> `,)
  }
  return <div id={'VideoFile'}>
    <InternalVideoPlayer src={videoData.filePath} />
    <div className={'action-buttons'}>
      <button className="btn btn-primary">Change</button>
      <button className="btn btn-danger" onClick={()=> dispatch(setAlert({
        message: "Do you really want to remove this Thumbnail?",
        type:'deleteAction',
        actionFunctions: onDeleteHandler
      }))}>Delete</button>
    </div>
  </div>;
};
export default VideoFile;
