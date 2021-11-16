import express from 'express';

const router = express.Router();

router.get('/check_api', async (req,res) => {
    res.send('Hello new world !')
})
export default router;