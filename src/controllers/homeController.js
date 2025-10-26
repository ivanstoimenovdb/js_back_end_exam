import { Router } from "express";
import { mythService } from "../services/index.js";


const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestMyths = await mythService.getLatest();

    res.render('home', { myths: latestMyths });
});

export default homeController;