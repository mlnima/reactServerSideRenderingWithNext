
import GlobalStore from "@store/GlobalStore";
import { ParsedQs } from 'qs';
import globalStore from "@store/GlobalStore";

export const multiQueryUniquer = (query: any): string => {
    return typeof query === 'string' ? query : Array.isArray(query) ? query[0] : null;
};

// export const multiQueryUniquer = (query: string | ParsedQs | string[] | ParsedQs[]): string | ParsedQs| null => {
//     if (typeof query === 'string') {
//         return query;
//     } else if (Array.isArray(query)) {
//         const firstItem = query[0];
//         return typeof firstItem === 'string' ? firstItem : null;
//     } else if (typeof query === 'object' && query !== null) {
//         // Handle ParsedQs object (potentially nested or with array values)
//         const values = Object.values(query);
//         const firstValue = values[0];
//         return typeof firstValue === 'string' ? firstValue : Array.isArray(firstValue) ? firstValue[0] : null;
//     } else {
//         return null;
//     }
// };


export const paginationQueryGenerator = (limit:number,)=>{
    //const initialSettings = GlobalStore.getInitialSettings();
    const initialSettings = globalStore.getSetting('initialSettings')

}