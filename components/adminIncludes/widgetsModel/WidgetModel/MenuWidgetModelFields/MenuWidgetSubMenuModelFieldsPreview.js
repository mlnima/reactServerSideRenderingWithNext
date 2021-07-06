// import React, {useEffect, useState, useContext, useRef} from 'react';
// import MenuWidgetEditForm from "./MenuWidgetEditForm";
// import _ from "lodash";
// import EditSubMenuForm from "./subMenuComponenets/EditSubMenuForm";
// //import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";
//
// const MenuWidgetSubMenuModelFieldsPreview = props => {
//     const [state, setState] = useState({});
//     const [subItemData, setSubItemData] = useState({
//         name: '',
//         target: '',
//         as: '',
//         type: '',
//         itemIndex: 0,
//         translations: {}
//     });
//
//
//
//
//     const onEditHandler = ()=>{
//         const findSubItemIndex = (props?.parentData?.subItems ||[]).findIndex(i=>i.itemId ===props.data.itemId)
//         const newSubItemsData = [
//             ...(props?.parentData?.subItems ||[]).slice(0, findSubItemIndex),
//             subItemData,
//             ...(props?.parentData?.subItems ||[]).slice(findSubItemIndex + 1),
//         ]
//         props.setParentData({
//             ...props.parentData,
//             subItems: newSubItemsData
//         })
//     }
//
//     // const onChangeHandlesr = e =>{
//     //     const findSubItemIndex = (props?.parentData?.subItems ||[]).findIndex(i=>i.itemId ===props.data.itemId)
//     //
//     //     const newDataToSet = {
//     //         ...props.data,
//     //         [e.target.name]: e.target.value
//     //     }
//     //
//     //     const newSubItemsData = [
//     //         ...(props?.parentData?.subItems ||[]).slice(0, findSubItemIndex),
//     //         newDataToSet,
//     //         ...(props?.parentData?.subItems ||[]).slice(findSubItemIndex + 1),
//     //     ]
//     //
//     //    console.log(newSubItemsData)
//     //
//     //     props.setParentData({
//     //         ...props.parentData,
//     //         subItems: newSubItemsData
//     //     })
//     // }
//
//     const onChangeHandler = e =>{
//         setSubItemData({
//             ...subItemData,
//             [e.target.name]: e.target.value
//         })
//     }
//     const onChangeHandlerWithTranslate = e =>{
//         props.activeEditingLanguage === 'default' ?
//             setSubItemData({
//                 ...subItemData,
//                 [e.target.name]: e.target.value
//             }) : setSubItemData({
//                 ...subItemData,
//                 translations: {
//                     ...subItemData.translations,
//                     [props.activeEditingLanguage]: {
//                         ...subItemData.translations?.[props.activeEditingLanguage] ?? {},
//                         [e.target.name]: e.target.value
//                     }
//                 }
//             })
//     }
//
//
//     return (
//         <div className='MenuWidgetSubMenuModelFieldsPreview'>
//
//
//         </div>
//     );
// };
// //export default MenuWidgetSubMenuModelFieldsPreview;
