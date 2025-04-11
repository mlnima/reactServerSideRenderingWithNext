import React, {FC,  useState} from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { IWidgetData, IMenuItem } from '@repo/typescript-types';
import AddNewItemForm from './AddNewItemForm';
import ItemPreview from './ItemPreview';
import { inputValueSimplifier,nestedObjectModifier } from '@repo/utils';

const MenuWidgetModelFieldsStyledDiv = styled.div`
    .mobileNavigationLabel {
        padding: 0 25px;
    }
`;

interface IProps {
    widgetSettings: {
        activeEditingLanguage: string;
    };
    widgetData: IWidgetData;
    setWidgetData: Function;
    onUniqueDataChangeHandler: Function;
}

const MenuWidgetModelFields: FC<IProps> = ({
    widgetSettings,
    setWidgetData,
    widgetData,
    onUniqueDataChangeHandler,
}) => {
    const [formData, setFormData] = useState<IMenuItem>({
        name: '',
        target: '',
        parent: undefined,
        type: 'internal',
        itemIndex: 0,
        itemId: 0,
        subItems: [],
        translations: {},
    });

    const [state, setState] = useState({
        activeEditingLanguage: 'default',
    });

    // useEffect(() => {
    //     console.log(`console=> `,widgetData.menuItems);
    // }, [widgetData.menuItems]);
    const onChangeHandlerWithTranslate = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (widgetSettings.activeEditingLanguage === 'default') {
            const modifiedState = nestedObjectModifier(formData,[name],value)
            console.log(`modifiedState=> `,modifiedState)
            // setFormData((prevFormData: IMenuItem) => ({
            //     ...prevFormData,
            //     [event.target.name]: event.target.value,
            // }));
        } else {
            const modifiedState = nestedObjectModifier(formData,[
                'translations',
                widgetSettings.activeEditingLanguage,
                name
            ],value)
            console.log(`modifiedStateT=> `,modifiedState)
            // setFormData((prevFormData: IMenuItem) => ({
            //     ...formData,
            //     translations: {
            //         ...formData.translations,
            //         [widgetSettings.activeEditingLanguage]: {
            //             ...(prevFormData.translations?.[widgetSettings?.activeEditingLanguage] ?? {}),
            //             [event.target.name]: event.target.value,
            //         },
            //     },
            // }));
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const value = inputValueSimplifier(e);
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: value,
        }));
    };



    const onAddHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formData.parent) {
            setWidgetData((prevState: IWidgetData) => ({
                ...prevState,
                menuItems: [
                    ...(prevState?.menuItems || []),
                    {
                        ...formData,
                        itemIndex: formData.itemIndex ? formData.itemIndex : widgetData?.menuItems?.length || 0,
                        itemId: nanoid() + prevState?.menuItems?.length || nanoid(),
                    },
                ],
            }));
        } else {
            const findParentIndex = widgetData?.menuItems.findIndex(
                (menuItem: IMenuItem) => menuItem.itemId === formData.parent,
            );
            const parentData = widgetData?.menuItems.find((menuItem: IMenuItem) => menuItem.itemId === formData.parent);

            const updatedParentData = {
                // @ts-ignore
                ...(parentData || {}),
                //@ts-ignore
                subItems: [
                    ...((widgetData?.menuItems?.[findParentIndex] || {})?.subItems || []),
                    {
                        ...formData,

                        itemId: nanoid() + widgetData?.menuItems?.length || nanoid(),
                        //@ts-ignore
                        itemIndex: parentData?.subItems?.length + 1 || 0,
                    },
                ],
            };

            const newMenuData = [
                ...widgetData.menuItems.slice(0, findParentIndex),
                updatedParentData,
                ...widgetData.menuItems.slice(findParentIndex + 1),
            ];

            setWidgetData({
                ...widgetData,
                menuItems: newMenuData,
            });
        }
    };

    // const onMenuStyleChangeHandler = e => {
    //     setWidgetData({
    //         ...widgetData,
    //         mobileNavigation: e.target.value
    //     })
    // }

    const renderCurrentItems = ( widgetData?.menuItems || [])
        ?.sort((a: IMenuItem, b: IMenuItem) => (a.itemIndex > b.itemIndex ? 1 : -1))
        .map(menuItem => {
            return (
                <ItemPreview
                    key={nanoid()}
                    data={menuItem}
                    widgetData={widgetData}
                    setWidgetData={setWidgetData}
                    activeEditingLanguage={widgetSettings.activeEditingLanguage}
                    parentsOption={widgetData.menuItems || []}
                />
            );
        });

    return (
        <MenuWidgetModelFieldsStyledDiv>
            <div className="checkInputFieldForWidget widgetSection">
                <p>Burger Menu On Desktop:</p>
                <input
                    type="checkbox"
                    name="burgerMenuOnDesktop"
                    checked={widgetData?.uniqueData?.burgerMenuOnDesktop}
                    onChange={e => onUniqueDataChangeHandler(e)}
                />
            </div>

            <AddNewItemForm
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onAddHandler}
                onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}
                data={formData}
                state={state}
                parentsOption={widgetData.menuItems || []}
                activeEditingLanguage={widgetSettings.activeEditingLanguage}
            />

            <div className="menu-items">
              {renderCurrentItems}
            </div>
        </MenuWidgetModelFieldsStyledDiv>
    );
};
export default MenuWidgetModelFields;


// {/*<MenuWidgetEditForm*/}
// {/*    onChangeHandler={onChangeHandler}*/}
// {/*    onSubmitHandler={onAddHandler}*/}
// {/*    onChangeHandlerWithTranslate={onChangeHandlerWithTranslate}*/}
// {/*    data={formData}*/}
// {/*    state={state}*/}
// {/*    parentsOption={widgetData.menuItems || []}*/}
// {/*    activeEditingLanguage={widgetSettings.activeEditingLanguage}*/}
// {/*    onDeleteHandler={() => null}*/}
// {/*    mode='Add'*/}
// {/*/>*/}