import { fetchCaveByParam, fetchCaveByCode, fetchMapCave } from "../services/caveService.js";

// GET
// For testing
/*export async function getCaves(req, res, next) {
    try {
        const caves = await fetchAllCaves();

        console.log("Caves loaded");
        res.status(200).json({
            success: true,
            data: caves
        });
    } catch(err) {
        next(err)
    }
}

*/

export async function conGetCaveByParam(req, res, next) {
    try {
        const { code, name, province, length_min, length_max, depth_min, depth_max, sort, order, pageSize, currentPage } = req.query; // differ from req.params req.params is for URL segments like /api/caves/:i req.query is for ?name=nigga&province=agartha
        const { caves, totalCaves } = await fetchCaveByParam(code, name, province, length_min, length_max, depth_min, depth_max, sort, order, pageSize, currentPage);
        
        const limit = parseInt(pageSize) || 20 // Same here from model
        
        console.log("Cave laoded");
        res.status(200).json({
            success: true,
            data: caves,
            page: currentPage,
            totalCaves: totalCaves,
            totalPages: Math.ceil(totalCaves / limit)
        });
    } catch(err) {
        next(err)
    }
}

export async function conGetCaveByCode(req, res, next) {
    try {
        const { code } = req.params;
        const cave = await fetchCaveByCode(code);

        console.log(`Cave ${code} loaded`)
        res.status(200).json({
            success: true,
            data: cave
        });
    } catch(err) {
        next(err)
    }
}

export async function conGetMapCave (req, res, next) {
    try {
        const { code, name, province, length_min, length_max, depth_min, depth_max, sort, order } = req.query; // differ from req.params req.params is for URL segments like /api/caves/:i req.query is for ?name=nigga&province=agartha
        const cave = await fetchMapCave(code, name, province, length_min, length_max, depth_min, depth_max, sort, order);
        
        console.log("Caves laoded");
        res.status(200).json({
            success: true,
            data: cave
        });
    } catch(err) {
        next(err)
    }
}