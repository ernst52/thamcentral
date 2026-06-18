// Route → Controller → Service → Model
import pool from '../config/db.js';

// GET 
/* For testing
export async function getAllCaves() {
    const result = await pool.query('SELECT * FROM caves');
    return result.rows;
}
*/

export async function getCaveByParam(code, name, province, length_min, length_max, depth_min, depth_max, sort, order, pageSize, currentPage){
    // We do this since if user only filters by name and not province query will breaks because province is undefined
    const conditions = [];
    const values = [];

    // NAME N CODE (FRONTEND NOTE: User can select search by code or name later)
    if (name) {
        conditions.push(`cave_name ILIKE $${values.length + 1}`) // ILIKE is case insensitive LIKE unlike WHERE. LIKE is a match
        // when you push name first, values.length is 0 so 0 + 1 = $1
        values.push(`%${name}%`) // % thingy is thing for LIKE, it works with LIKE
    }

    if (code) {
        conditions.push(`cave_code ILIKE $${values.length + 1}`)
        values.push(`%${code}%`)
    }

    // PROVINCE
    if (province) {
        conditions.push(`cave_province = $${values.length + 1}`) // then you push province, values.length is now 1 so 1 + 1 = $2
        // Can't do   conditions.push(cave_province = $2) because it's hard conded and will break when query is empty, since it expects the $1 to be fed
        // but this dynamic way It'll be $0 when nothing is fed
        values.push(province)
    }

    // LENGTH AND DEPTH (FRONTEND NOTE: Slider)
    if (length_min) {
        conditions.push(`cave_length >= $${values.length + 1}`) 
        values.push(length_min)
    }

    if (length_max) {
        conditions.push(`cave_length <= $${values.length + 1}`) 
        values.push(length_max)
    }

    if (depth_min) {
        conditions.push(`cave_depth >= $${values.length + 1}`)
        values.push(depth_min)
    }

    if (depth_max) {
        conditions.push(`cave_depth <= $${values.length + 1}`)
        values.push(depth_max)
    }

    // FILTER - for future: exploration status, tags, perspect

    // SORT (NOTE: CHANGE CAVE_ID TO CAVE_CODE WHEN REAL DATA!!!)
    const allowedSort = ['cave_length', 'cave_depth', 'cave_id'] // Whitelist on what's allowed to be sort
    const sortColumn = allowedSort.includes(sort) ? sort : 'cave_id' // Soo the sort via is thing user selected that been passed down here
    const sortDirection = order === 'desc' ? 'DESC' : 'ASC' // Same to above, user either select desc or asc and it'll just pass down here

    // QUERY
    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''; // ['a', 'b', 'c'].join(' AND ')   // Output: "a AND b AND c" kidna like this

    // PAGINATION
    const limit = parseInt(pageSize) || 20; // Very important to do these, or else it return nan since it registered as string not number
    const page = parseInt(currentPage) || 1;

    const countResult = await pool.query(`SELECT COUNT(*) FROM caves ${where}`, values)
    const totalCaves = parseInt(countResult.rows[0].count)
    
    // totalPages = getTotalPages(total);  Don't calculate totalpages here, it's frontend's job

    const entryLimit = limit // Size user can select or choose on frontend
    const entryOffset = (page - 1) * limit // Standard forumla for pagination.  page 1: skip 0, show 1-10 → (1-1) * 10 = 0 page 2: skip 10, show 11-20 → (2-1) * 10 = 10
                                                                   
    const result = await pool.query(`SELECT * FROM caves ${where} ORDER BY ${sortColumn} ${sortDirection} LIMIT ${entryLimit} OFFSET ${entryOffset}`, values);
    return { caves: result.rows, totalCaves }
}

export async function getCaveByCode(code) {
    const result = await pool.query('SELECT * FROM caves WHERE cave_code = $1', [code]) 
    return result.rows[0];
}

