import { Router, Request, Response } from 'express';
import amazonDataValidator from '../validators/amazonDataValidator'
import amazonDataController from '../controllers/amazonDataController';
const router = Router();

const amazonValidator = new amazonDataValidator()
const amazonController = new amazonDataController()

router.post('/send', amazonValidator.requestAmazonDataValidtor, amazonController.create);

export default router;