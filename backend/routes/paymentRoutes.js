// backend/routes/paymentRoutes.js
import express from 'express';
const router = express.Router();
import {
  getPayPalClientId,
  getStripePublicKey,
} from '../controllers/paymentController.js';

router.get('/paypal', getPayPalClientId); // GET PayPal client ID
router.get('/stripe', getStripePublicKey); // GET Stripe public key

// Add routes for actual payment processing if needed, e.g.:
// router.post('/stripe/process', protect, processStripePayment);

export default router;