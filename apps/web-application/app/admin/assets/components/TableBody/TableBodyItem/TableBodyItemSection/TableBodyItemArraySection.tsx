'use client';

import { FC } from 'react';
import Link from 'next/link';

interface RenderArraySectionPropTypes {
  data: {
    _id: string;
    name: string;
  }[];
}

const TableBodyItemArraySection: FC<RenderArraySectionPropTypes> = ({ data }) => {


  const renderArrItem = (data || []).map((item,index) => {
    return (
      <Link
        key={`${index + item._id}`}
        href={`/admin/assets?assetsType=posts&metaId=${item._id}`}
        className={'btn btn-primary'}
      >
        {item.name}
      </Link>
    );
  });

  return (
    <div className="TableBodyItemArraySection">
      {renderArrItem}
    </div>
  );
};

export default TableBodyItemArraySection;
