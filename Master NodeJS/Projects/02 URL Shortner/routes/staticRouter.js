import express from 'express';
import URL from '../models/url.model.js'

const router = express.Router();

router.get('/url', async(req, res) => {
    // const allurls = await URL.find({})
    return res.render('home');
})

export default router;