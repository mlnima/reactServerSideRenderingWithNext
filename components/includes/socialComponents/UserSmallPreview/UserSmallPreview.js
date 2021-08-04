import React, {useEffect, useState, useContext, useRef} from 'react';
import Link from "next/link";


const UserSmallPreview = ({username,role,profileImage,name,lastName,_id,gender}) => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <Link href={{
            pathname:`/user/${username}`,
            query: { username }
        }}
        as={`/user/${username}`}
        >
            <a  className='user'>
                <style jsx>{`
                    .user{
                        list-style: none;
                        //border: solid white 1px;
                        padding: 5px 10px;
                        width: clamp(100px, 300px,600px );
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        background-color: var(--navigation-background-color);
                        margin: 10px auto;
                    }
                    .user-profile-image{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                    .user-names-info{
                        margin: 0 5px;
                    }
                    p{
                        color: var(--navigation-text-color); 
                    }
                `}</style>

                <img src={  profileImage ? profileImage :
                            gender === 'male' ? '/public/asset/images/user/maleAvatar50.jpg' :
                            gender === 'female' ?    '/public/asset/images/user/femaleAvatar50.jpg' :
                            '/public/asset/images/user/noGenderAvatar50.jpg'
                } alt="user-profile-image" className="user-profile-image"/>
                <div className='user-names-info'>
                    <p>{username}</p>
                    <p>{name} {lastName}</p>
                </div>
        </a></Link>

    );
};
export default UserSmallPreview;
