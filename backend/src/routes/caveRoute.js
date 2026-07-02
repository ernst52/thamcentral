import express from 'express';
import { conGetCaveByParam, conGetCaveByCode, conGetMapCave } from '../controllers/caveController.js';

const router = express.Router(); // Using router

// GET
// router.get('/', getCaves); Removed since get by param can also work the same
router.get('/', conGetCaveByParam);

router.get('/map', conGetMapCave); // /:map will conflict with /:code route. make it /map before /:code. As /: is dynamic can be anything /nigger /chai

router.get('/:code', conGetCaveByCode);

export default router;