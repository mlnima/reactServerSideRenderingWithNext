import Link from "next/link";
import styled from "styled-components";

const EditLinkForAdminStyledDiv = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
  align-items: center;
  
  .edit-as-admin-link {
    background-color: #f90;
    text-align: center;
    font-size: 12px;
    border-radius: 5px;
    padding: 5px;
    color: black;
    font-weight: bold;

    &:hover {
      transition: .4s;
      transform: scale(1.2);
    }
  }
`

const EditLinkForAdmin = ({_id}) => {
        return (
            <EditLinkForAdminStyledDiv className='edit-as-admin'>

                <Link href={`/admin/post?id=${_id}`}>
                    <a className='edit-as-admin-link'>
                        Edit as Admin
                    </a>
                </Link>
                <a className='edit-as-admin-link' href={`/admin/post?id=${_id}`} target='_blank'>
                    Edit As Admin On New Tab
                </a>
            </EditLinkForAdminStyledDiv>

        )
};
export default EditLinkForAdmin;
