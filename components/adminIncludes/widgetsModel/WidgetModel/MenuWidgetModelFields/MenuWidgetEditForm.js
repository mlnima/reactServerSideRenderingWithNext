import _ from "lodash";

const MenuWidgetEditForm = props => {

    const renderItemsForParent = props.parentsOption.map(parentOption=>{
        return(
            <option value={parentOption.itemId} key={_.uniqueId('id_')} >{parentOption.name}</option>
        )
    });
console.log(props)
    return (
        <form className='menu-widget-form' onSubmit={e => props.onSubmitHandler(e)}>
        <style jsx>{`
            .menu-widget-form{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin: auto;
                width: 90%;
            }
            .menu-widget-form-form-field{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between ;
            }
        `}</style>

            <div className='menu-widget-form-form-field'>
                <p>Parent:</p>
                <select name='parent' value={props.data.parent} onChange={e => props.onChangeHandler(e)}>
                    <option>select</option>
                    {renderItemsForParent}
                </select>
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Name:</p>
                <input required={true} type="text" name='name' onChange={e=>props.onChangeHandlerWithTranslate(e)}
                       value={props.activeEditingLanguage === 'default' ? props.data.name : props.data.translations?.[props.activeEditingLanguage]?.name || ''}
                />
            </div>

            <div className='menu-widget-form-form-field'>
                <p>Target:</p>
                <input required={true} type="text" name='target' value={props.data.target ||''} onChange={e => props.onChangeHandler(e)}/>
            </div>

            <div className='menu-widget-form-form-field'>
                <p>As:</p>
                <input type="text" name='as' value={props.data.as ||''} onChange={e => props.onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Item Index:</p>
                <input required={true} type='number'  name='itemIndex' value={props.data.itemIndex ||''} onChange={e => props.onChangeHandler(e)}/>
            </div>
            <div className='menu-widget-form-form-field'>
                <p>Type:</p>
                <select required={true} name='type' onChange={e => props.onChangeHandler(e)} value={props.data.type}>
                    <option>Select</option>
                    <option value='internal'>Internal</option>
                    <option value='external'>External</option>
                </select>
            </div>

            <div className='menu-widget-form-form-field'>
                <button type='submit'>{props.mode}</button>
                {props.mode === 'Edit' ?
                    <button onClick={() => props.onDeleteHandler(props.data.name, props.data.itemId)}>Delete</button>
                    :null
                }
            </div>

        </form>
    );
};
export default MenuWidgetEditForm;
