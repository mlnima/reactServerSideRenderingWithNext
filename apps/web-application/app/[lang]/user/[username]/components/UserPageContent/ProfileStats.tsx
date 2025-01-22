import React, {FC} from "react";

interface IProps {
    dictionary: {
        [key: string]: string;
    },
    postsCount?:number ,
    followersCount?:number,
    followingCount?:number,

}

const ProfileStats: FC<IProps> = ({dictionary,postsCount,followersCount,followingCount}) => {
    return <div className={'followCount'}>
        <p>
              <span>
                {postsCount || 0}{' '}
                  {dictionary?.['Posts'] || 'Posts'}
              </span>
        </p>
        <p>
              <span>
                {followersCount || 0}{' '}
                  {dictionary?.['Followers'] || 'Followers'}
              </span>
        </p>
        <p>
              <span>
                {followingCount || 0}{' '}
                  {dictionary?.['Followings'] || 'Followings'}
              </span>
        </p>
    </div>
};
export default ProfileStats
