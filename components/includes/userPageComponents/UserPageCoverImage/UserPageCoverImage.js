const UserPageCoverImage = ({coverImage,profileImage}) => {

    return (
        <div className='user-page-cover-image'>
        <style jsx>{`
            .user-page-cover-image{
                position: relative;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                height: 300px;
                background-image:  ${coverImage ?'url("' + coverImage + '")' : 'linear-gradient(to bottom right, var(--navigation-background-color), black);' }           ;
             
                max-height: 588px;
               
            }
            .user-page-profile-image{
                position: absolute;
                bottom: 0;
                margin: auto;
                left: 5%;
                border: black 1px solid;
                max-width: 150px;
                max-height: 150px;
            }
        
        `}</style>

            <img src={profileImage || '/static/images/noImage/no-image-available.png'} alt='user-page-profile-image' className='user-page-profile-image'/>
        </div>
    );
};
export default UserPageCoverImage;
