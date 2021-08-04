const UserPageProfileImage = ({coverImage,profileImage}) => {

    return (
        <div className='user-page-profile-image'>
        <style jsx>{`
            .user-page-profile-image{
                width: 77px;
                height: 77px;
                .user-page-profile-image-content{
                    margin: auto;
                    width: 77px;
                    height: 77px;
                    border-radius: 50%;
                }
            }
            
            @media only screen and (min-width: 768px){
                .user-page-profile-image{
                    width: 150px;
                    height: 150px;
                    .user-page-profile-image-content{
                        margin: auto;
                        width: 150px;
                        height: 150px;
                        border-radius: 50%;
                    }
                }
            }
        
        `}</style>

            <img src={profileImage || '/static/images/noImage/no-image-available.png'} alt='user-page-profile-image-content' className='user-page-profile-image-content'/>
        </div>
    );
};
export default UserPageProfileImage;
