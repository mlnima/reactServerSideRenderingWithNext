const VideoPlayer = ({title,description,duration,mainThumbnail,videoEmbedCode,lastModify,videoUrl,_id,videoScriptCode}) => {
        return (
            <div className='video-player'>
                    <style jsx>{`
.video-player{
  margin:  0;
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
}

.responsive-player{
    overflow: hidden;
    position: relative;
    padding-bottom: 56.30%;
    margin-bottom: 20px;
    height: 0;
}

iframe{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      margin-bottom: 50px;
      padding: 0 !important;
}
.video-player-video-type{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      margin-bottom: 50px;
      //object-fit: cover;
      outline: none;
      border-radius: 10px;
}

`}</style>
                <meta itemProp="name" content={title}/>
                <meta itemProp="description" content={description}/>
                <meta itemProp="duration" content={duration}/>
                <meta itemProp="thumbnailUrl" content={mainThumbnail}/>
                <meta itemProp="embedURL" content={videoUrl || videoEmbedCode}/>
                <meta itemProp="uploadDate" content={lastModify}/>
                <div  className="responsive-player">
                    {videoUrl?
                        <video className='video-player-video-type' controls controlsList=" nodownload" poster={mainThumbnail} preload="none">
                            <source src={videoUrl}/>
                        </video>
                        :videoEmbedCode && !videoUrl?
                            <iframe className={_id}  title={title} src={videoEmbedCode} frameBorder="0" width='640' height='360' scrolling="no"/>
                            :!videoUrl && !videoEmbedCode && videoScriptCode?
                                videoScriptCode:
                                null
                    }
                </div>

            </div>

        );
};
export default VideoPlayer;