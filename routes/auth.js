import express from 'express';

const router = express.Router();

router.get('/check_api', async (req,res) => {
    res.send('Hello Docker 1!')
})
export default router;
