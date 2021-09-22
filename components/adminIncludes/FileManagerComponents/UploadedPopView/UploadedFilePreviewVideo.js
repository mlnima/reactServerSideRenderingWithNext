//UploadedFilePreviewVideo
const UploadedFilePreviewVideo = ({filePath}) => {
    return (
        <div className='uploaded-pop-view-video'>
            <style jsx>{`
                .uploaded-pop-view-video{
                     display: flex;
                     flex-direction: column;
                     align-items: center;
                    .uploaded-pop-view-video-element{
                        width:90%;
                        max-width: 450px;
                        padding: 5px;
                    } 
                }
            `}</style>
            <video className='uploaded-pop-view-video-element' controls >
                <source src={ process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + filePath.replace('./', '') }  />
            </video>

        </div>
    );
};
export default UploadedFilePreviewVideo;
