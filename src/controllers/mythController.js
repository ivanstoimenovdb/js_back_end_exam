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


export default mythController;