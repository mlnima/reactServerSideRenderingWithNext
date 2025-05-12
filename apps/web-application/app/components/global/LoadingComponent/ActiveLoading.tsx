import React, { FC } from "react";
import Spinner from './Spinner';

interface IProps {
    onClickEvent: any;
}

const ActiveLoading: FC<IProps> = ({ onClickEvent }) => {
    return (
        <div id={'activeLoading'} onClick={onClickEvent} onTouchStartCapture={onClickEvent}>
          <Spinner/>
        </div>
    );
};

export default ActiveLoading;