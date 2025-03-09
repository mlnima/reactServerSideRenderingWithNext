'use client';

import { convertVariableNameToName } from "@repo/utils";
import { useSelector } from "react-redux";
import { DashboardStore } from "@repo/typescript-types";

interface PropTypes {
  onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rendering: boolean;
  name: string;
}

const TextAreaComponent = (props: PropTypes) => {
  const post = useSelector(({ posts }: DashboardStore) => posts.post);

  if (props.rendering) {
    return (
      <div className='post-information-section'>
        <div className="title">
          <p>{convertVariableNameToName(props.name)}</p>
        </div>
        <div className="editor">
          <textarea
            className='primaryInput'
            name={props.name}
            value={post[props.name] || ''}
            onChange={e => props.onChangeHandler(e)}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TextAreaComponent;

// import {convertVariableNameToName} from "@repo/utils";
// import {useSelector} from "react-redux";
// import {DashboardStore} from "@repo/typescript-types";
// import {FC} from "react";
//
// interface PropTypes{
//     onChangeHandler:Function,
//     rendering:boolean
//     name:string
// }
//
// const TextAreaComponent:FC<PropTypes> = props => {
//     const post = useSelector(({posts}: DashboardStore) => posts.post);
//     if (props.rendering) {
//         return (
//             <div className='post-information-section'>
//                 <div className="title">
//                     <p>{convertVariableNameToName(props.name)}</p>
//                 </div>
//                 <div className="editor">
//                     {/*//@ts-ignore*/}
//                     <textarea className='primaryInput' name={props.name} value={post[props.name] || ''}
//                               onChange={e => props.onChangeHandler(e)}/>
//                 </div>
//             </div>
//         );
//     } else return null
//
// };
//
// export default TextAreaComponent;
