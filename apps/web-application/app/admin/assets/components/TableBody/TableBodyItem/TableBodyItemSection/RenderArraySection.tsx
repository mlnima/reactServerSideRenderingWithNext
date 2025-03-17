'use client';
import styled from 'styled-components';
import { FC } from 'react';
import Link from 'next/link';

const ArraySectionStyledDiv = styled.div`
    a {
        border: none;
        margin: 2px;
        padding: 2px;
        font-size: 10px;
    }
`;

interface RenderArraySectionPropTypes {
  data: {
    _id: string;
    name: string;
  }[];
}

const RenderArraySection: FC<RenderArraySectionPropTypes> = ({ data }) => {


  const renderArrItem = (data || []).map((item) => {
    return (
      <Link
        key={`${item._id}`}
        href={`/admin/assets?assetsType=posts&metaId=${item._id}`}
        className={'btn btn-primary'}
      >
        {item.name}
      </Link>
    );
  });

  return (
    <ArraySectionStyledDiv className="asset-page-item-array-section">
      {renderArrItem}
    </ArraySectionStyledDiv>
  );
};

export default RenderArraySection;
