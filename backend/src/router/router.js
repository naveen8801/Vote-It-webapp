import { createPoll , voteHere  ,getPoll} from '../controllers/controllers.js';
import express from 'express';


const router = express.Router();

router.get('/',(req,res)=>{
    res.json("Running !")
})
router.post('/poll', createPoll);
router.get('/getpoll/:id',getPoll);
router.patch('/:pollid/:optionid',voteHere)

export default router;
