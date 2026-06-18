import { getCaveByParam, getCaveByCode } from "../models/caveModel.js";

// GET 
/* For testing
export async function fetchAllCaves() {
    return await getAllCaves();
}
*/

export async function fetchCaveByParam(code, name, province, length_min, length_max, depth_min, depth_max, sort, order, pageSize, currentPage){
    return await getCaveByParam(code, name, province, length_min, length_max, depth_min, depth_max, sort, order, pageSize, currentPage);
}

export async function fetchCaveByCode(code) {
    return await getCaveByCode(code);
}