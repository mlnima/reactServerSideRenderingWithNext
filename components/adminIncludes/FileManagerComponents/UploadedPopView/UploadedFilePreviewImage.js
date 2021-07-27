const UploadedFilePreviewImage = ({filePath}) => {
    return (
        <div className='uploaded-pop-view-image'>
            <style jsx>{`
                .uploaded-pop-view-image{
                     display: flex;
                     flex-direction: column;
                     align-items: center;
                    .uploaded-pop-view-image-element{
                        width:90%;
                        max-width: 450px;
                        padding: 5px;
                    } 
                }
            `}</style>
            <img className='uploaded-pop-view-image-element' src={ process.env.REACT_APP_PRODUCTION_URL + '/' + filePath.replace('./', '') }/>

        </div>
    );
};
export default UploadedFilePreviewImage;
