import React from "react";

const UploadedFilePreviewText = ({file}) => {
    return (
        <div className='uploaded-pop-view-text'>
            <style jsx>{`
                .uploaded-pop-view-text{
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      width: 100%;
                      height :400px;
                    .uploaded-pop-view-text-element{
                    
                        width: 100%;
                        min-width : 95%;
                         height :400px;
                    } 
                }
            `}</style>

            <textarea className='uploaded-pop-view-text-element' value={ file}/>
        </div>
    );
};
export default UploadedFilePreviewText;
