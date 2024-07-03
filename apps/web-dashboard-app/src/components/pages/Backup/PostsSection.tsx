import { FC, useState } from 'react';
import styled from 'styled-components';
import { postTypes } from '@repo/data-structures/dist/src';

const Style = styled.div``;

interface PropTypes {}

const PostsSection: FC<PropTypes> = ({}) => {
    const [postType, setPostType] = useState<string>();

    const onBackupHandler = ()=>{

    }
    return (
        <Style className={'export-type-container'}>
            <select className={'primarySelect'} name={'postType'} onChange={e => setPostType(e.target.value)}>
                {postTypes.map((postType: string) => (
                    <option value={postType} key={postType}>
                        {postType}
                    </option>
                ))}
            </select>
        </Style>
    );
};
export default PostsSection;
