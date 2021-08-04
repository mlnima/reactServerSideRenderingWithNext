import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import MenuWidgetModelFieldsPreview from "./MenuWidgetModelFieldsPreview";
import _ from "lodash";
import MenuWidgetEditForm from "./MenuWidgetEditForm";

const MenuWidgetModelFields = props => {
    const [formData, setFormData] = useState({
        name: '',
        target: '',
        as: '',
        type: 'internal',
        itemIndex: 0,
        itemId: 0,
        translations: {},
    });

    const [state, setState] = useState({
        activeEditingLanguage: 'default'
    })

    const onChangeHandlerWithTranslate = (e) => {
        props.widgetSettings.activeEditingLanguage === 'default' ?
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            }) : setFormData({
                ...formData,
                translations: {
                    ...formData.translations,
                    [props.widgetSettings.activeEditingLanguage]: {
                        ...formData.translations?.[props.widgetSettings.activeEditingLanguage] ?? {},
                        [e.target.name]: e.target.value
                    }
                }
            })
    }

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const onAddHandler = e => {
        e.preventDefault()
        if (!formData.parent){
            props.setWidgetData({
                ...props.widgetData,
                menuItems: [
                    ...props?.widgetData?.menuItems || [],
                    {
                        ...formData,
                        itemIndex:formData.itemIndex ? parseInt(formData.itemIndex) : (props?.widgetData?.menuItems.length ||0),
                        itemId : _.uniqueId('id_') + props?.widgetData?.menuItems.length  || _.uniqueId('id_')
                    }
                ]
            })
        }else{

            const findParentIndex = props?.widgetData?.menuItems.findIndex(menuItem=>menuItem.itemId === formData.parent)
            const parentData = props?.widgetData?.menuItems.find(menuItem=>menuItem.itemId === formData.parent)
            const updatedParentData = {
                ...(parentData || {}),
                subItems:[...((props?.widgetData?.menuItems?.[findParentIndex] || {})?.subItems||[]), {
                    ...formData,
                    itemId : _.uniqueId('sub_') + props?.widgetData?.menuItems.length  || _.uniqueId('sub_'),
                    itemIndex:parentData?.subItems?.length +1 || 0,
                }]
            }

            const newMenuData = [
                ...props.widgetData.menuItems.slice(0, findParentIndex),
                updatedParentData,
                ...props.widgetData.menuItems.slice(findParentIndex + 1),
            ]

            props.setWidgetData({
                ...props.widgetData,
                menuItems: newMenuData
            })


        }

    }

    const onMenuStyleChangeHandler = e => {
        props.setWidgetData({
            ...props.widgetData,
            mobileNavigation: e.target.value
        })
    }

    const renderCurrentItems = (props?.widgetData?.menuItems?.sort((a, b) => a.itemIndex > b.itemIndex ? 1 : -1) || []).map(menuItem => {
        return (
            <MenuWidgetModelFieldsPreview key={_.uniqueId('id_')}
                                          data={menuItem}
                                          widgetData={props.widgetData}
                                          setWidgetData={props.setWidgetData}
                                          activeEditingLanguage={props.widgetSettings.activeEditingLanguage}
                                          parentsOption={props.widgetData.menuItems || []}
                                          state={state}
            />
        )
    })

    if (props.rendering) {
        return (
            <div>
            <style jsx>{`
                .mobileNavigationLabel{
                    padding: 0 25px;
                }
            `}</style>
                <div className='menu-form-field'>
                    <p className='mobileNavigationLabel '><FontAwesomeIcon icon={faBars} className='navigation-mobile-btn-logo' style={{width:'15px',height:'15px'}}/> Mobile Navigation: </p>
                    <select required={true} name='mobileNavigation' value={props.mobileNavigation} onChange={e => onMenuStyleChangeHandler(e)}>
                        <option>Select</option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </select>
                </div>
                <MenuWidgetEditForm
                    onChangeHandler={onChangeHandler}
                    onSubmitHandler={onAddHandler}
                    onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                    data={formData}
                    setData={setFormData}
                    state={state}
                    parentsOption={props.widgetData.menuItems || []}
                    activeEditingLanguage={props.widgetSettings.activeEditingLanguage}
                    onDeleteHandler={()=>null}
                    mode='Add'
                />

                <div className='menu-items'>
                    {renderCurrentItems}
                </div>
            </div>
        );
    } else return null

};
export default MenuWidgetModelFields;

