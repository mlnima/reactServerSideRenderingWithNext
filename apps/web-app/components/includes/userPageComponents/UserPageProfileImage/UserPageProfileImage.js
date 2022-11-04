import styled from "styled-components";

const UserPageProfileImageStyledDiv = styled.div`
  width: 77px;
  height: 77px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  .user-page-profile-image-content{
    width: 77px;
    height: 77px;
    border-radius: 50%;
  }
  @media only screen and (min-width: 768px){
      width: 150px;
      height: 150px;
      .user-page-profile-image-content{
        margin: auto;
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
  }
`
const UserPageProfileImage = ({gender,profileImage}) => {


    return (
        <UserPageProfileImageStyledDiv className='user-page-profile-image'>
            <img src={profileImage ? profileImage + '?date=' + Date.now() : '/asset/images/user/noGenderAvatar150.jpg'}
                 alt='user-page-profile-image-content'
                 className='user-page-profile-image-content'
            />

        </UserPageProfileImageStyledDiv>
    );
};
export default UserPageProfileImage;
