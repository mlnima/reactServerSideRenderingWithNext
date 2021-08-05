const UserPageProfileImage = ({gender,profileImage}) => {

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
            <img src={profileImage ? profileImage + '?date=' + Date.now() : '/public/asset/images/user/noGenderAvatar150.jpg'} alt='user-page-profile-image-content' className='user-page-profile-image-content'/>
        </div>
    );
};
export default UserPageProfileImage;
