import express from 'express';
const router = express.Router(); 
import {getProducts, getProductByID, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/CheckObjectId.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(checkObjectId, getProductByID).put(protect, admin, checkObjectId, updateProduct).delete(protect, admin, checkObjectId,deleteProduct);

export default router;  