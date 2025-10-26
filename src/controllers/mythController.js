import { Router } from "express";
import { mythService } from "../services/index.js";
import { isAuth } from "../middlewares/authMiddlewares.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const mythController = Router();

// Add myths:
// Rendering:
mythController.get('/create', isAuth, (req, res) => {
    res.render('myths/create');
})

// Creating:
mythController.post('/create', isAuth, async(req, res) => {
    const mythData = req.body;
    const userId   = req.user.id;

    try {
        await mythService.create(mythData, userId);
        res.redirect('/myths');
    } catch (err) {
        res.render('myths/create',{
            error: getErrorMessage(err),
            myth: mythData
        })
    }
})

// Dashboard myths:
mythController.get(('/'), async (req, res) => {
    const myths = await mythService.getAll();

    res.render('myths', {myths});
})

// Details myth:
// Show details.
mythController.get('/:mythId/details', async (req, res) =>{
    const mythId = req.params.mythId;
    const myth = await mythService.getOne(mythId);
    const userId = req.user?.id;
    const isOwner = myth.owner.equals(userId);

    const isLiked = myth.likedList.some( like => like.equals(userId));

    res.render('myths/details', {myth, isOwner, isLiked})
})

mythController.get('/:mythId/like', isAuth, async (req, res) =>{
    const mythId = req.params.mythId;
    const userId = req.user.id;

    await mythService.likePost(mythId, userId);

    res.redirect(`/myths/${mythId}/details`);
})


export default mythController;