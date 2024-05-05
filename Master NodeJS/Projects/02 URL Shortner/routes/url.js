import express from 'express';
import  handleGenerateNewShortURL  from '../controllers/url.controller.js';

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get('/:id', );

router.get('/analytics/:id', );

export default router;