const VideoPlayer = ({post}) => {
    return (
        <div className='video-player'>
            <style jsx>{`
              .video-player {
                margin: 0;
                position: relative;
                top: 0;
                right: 0;
                left: 0;
                width: 100%;
              }

              .responsive-player {
                overflow: hidden;
                position: relative;
                padding-bottom: 56.30%;
                margin-bottom: 20px;
                height: 0;
              }

              iframe {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                margin-bottom: 50px;
                padding: 0 !important;
              }

              .video-player-video-type {
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

              @media only screen and (min-width: 768px) {
                .video-player {
                  max-width: 1300px;
                }
              }
            `}</style>
            <meta itemProp="name" content={post.title}/>
            <meta itemProp="description" content={post.description}/>
            <meta itemProp="duration" content={post.duration}/>
            <meta itemProp="thumbnailUrl" content={post.mainThumbnail}/>
            <meta itemProp="embedURL" content={post.videoUrl || post.videoEmbedCode}/>
            <meta itemProp="uploadDate" content={post.updatedAt}/>
            <div className="responsive-player">
                {post.videoUrl ?
                    <video className='video-player-video-type' controls controlsList=" nodownload" poster={post.mainThumbnail} preload="none">
                        <source src={post.videoUrl}/>
                    </video>
                    : post.videoEmbedCode && !post.videoUrl ?
                        <iframe className={post._id} title={post.title} src={post.videoEmbedCode} frameBorder="0" width='640' height='360' scrolling="no"/>
                        : !post.videoUrl && !post.videoEmbedCode && post.videoScriptCode ?
                            post.videoScriptCode :
                            null
                }
            </div>

        </div>

    );
};
export default VideoPlayer;