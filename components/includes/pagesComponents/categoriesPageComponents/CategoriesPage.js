import CategoriesRenderer from "./Components/CategoriesRenderer/CategoriesRenderer";

const CategoriesPage = props => {

    return (
        <div className='categories'>
             <CategoriesRenderer categories={props.categories} />
        </div>
    );
};
export default CategoriesPage;
