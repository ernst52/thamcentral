import express from 'express';
import { conGetCaveByParam, conGetCaveByCode } from '../controllers/caveController.js';

const router = express.Router(); // Using router

// GET
// router.get('/', getCaves); Removed since get by param can also work the same
router.get('/', conGetCaveByParam);

router.get('/:code', conGetCaveByCode);

export default router;