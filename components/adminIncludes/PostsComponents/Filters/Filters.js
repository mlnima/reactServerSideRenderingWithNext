import React,{useEffect,useState,useContext} from 'react';
import FilterStatusBtn from "./FilterStatusBtn";
import FilterSearch from "./FilterSearch";
import FilterDropDownActions from "./FilterDropDownActions";
import FilterPagination from "./FilterPagination";

const Filters = props => {
    const [state, setState] = useState({
    });
    useEffect(()=>{
    },[]);
    return (
        <div className='Filters'>
            <FilterStatusBtn {...props}/>
            <FilterSearch {...props}/>
            <FilterDropDownActions {...props} />
            <FilterPagination {...props}/>
        </div>
    );
};
// export default Filters;